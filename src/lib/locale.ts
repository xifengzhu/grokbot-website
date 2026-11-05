export type Locale = 'zh' | 'en';

export type PageId = 'home' | 'services' | 'cases' | 'about' | 'contact';

const PAGE_IDS: readonly PageId[] = ['home', 'services', 'cases', 'about', 'contact'];

export function normalizePathname(input: string): string {
  const trimmed = input.trim();
  let path = trimmed;
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      path = new URL(trimmed).pathname;
    } catch {
      path = trimmed;
    }
  } else {
    path = trimmed.split(/[?#]/)[0] ?? trimmed;
  }
  path = path.replace(/\/{2,}/g, '/');
  if (!path.startsWith('/')) path = `/${path}`;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path || '/';
}

export function pathFor(page: PageId, locale: Locale): string {
  if (locale === 'en') return page === 'home' ? '/en' : `/en/${page}`;
  return page === 'home' ? '/' : `/${page}`;
}

export function getLocaleFromPath(pathname: string): Locale {
  const path = normalizePathname(pathname);
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'zh';
}

export function getPageFromPath(pathname: string): PageId | null {
  const path = normalizePathname(pathname);
  if (path === '/' || path === '/en') return 'home';
  const match = path.match(/^\/(?:en\/)?(services|cases|about|contact)$/);
  if (!match) return null;
  const page = match[1];
  return PAGE_IDS.includes(page as PageId) ? (page as PageId) : null;
}

/** Language switch target: same page in the other locale. Unknown paths fall back to that locale's home. */
export function getAlternatePath(pathname: string, targetLocale: Locale): string {
  const page = getPageFromPath(pathname) ?? 'home';
  return pathFor(page, targetLocale);
}
