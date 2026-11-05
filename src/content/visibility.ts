import { primaryCases } from './cases';
import { copy } from './copy';
import { SEO_LOCALES, SEO_PAGES, seoFor } from './seo';

/** Strings that can appear on the public site. Gated TBD / NBA copy is excluded. */
export function visibleCopyBlob(): string {
  const { gated: _gated, ...rest } = copy;
  const seo = SEO_PAGES.flatMap((page) => SEO_LOCALES.map((locale) => seoFor(page, locale)));
  return JSON.stringify({ rest, cases: primaryCases, seo });
}
