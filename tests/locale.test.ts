import { describe, expect, it } from 'vitest';
import {
  getAlternatePath,
  getLocaleFromPath,
  getPageFromPath,
  pathFor,
  type Locale,
  type PageId,
} from '../src/lib/locale';

const pages: PageId[] = ['home', 'services', 'cases', 'about', 'contact'];

const pairs: Array<{ zh: string; en: string; page: PageId }> = [
  { page: 'home', zh: '/', en: '/en' },
  { page: 'services', zh: '/services', en: '/en/services' },
  { page: 'cases', zh: '/cases', en: '/en/cases' },
  { page: 'about', zh: '/about', en: '/en/about' },
  { page: 'contact', zh: '/contact', en: '/en/contact' },
];

describe('locale path helpers', () => {
  it('maps each of the ten PRD urls to the same page in the other locale', () => {
    for (const pair of pairs) {
      expect(pathFor(pair.page, 'zh')).toBe(pair.zh);
      expect(pathFor(pair.page, 'en')).toBe(pair.en);
      expect(getAlternatePath(pair.zh, 'en')).toBe(pair.en);
      expect(getAlternatePath(pair.en, 'zh')).toBe(pair.zh);
      expect(getPageFromPath(pair.zh)).toBe(pair.page);
      expect(getPageFromPath(pair.en)).toBe(pair.page);
      expect(getLocaleFromPath(pair.zh)).toBe('zh');
      expect(getLocaleFromPath(pair.en)).toBe('en');
    }
  });

  it('round-trips a language switch back to the original path', () => {
    for (const pair of pairs) {
      const toEn = getAlternatePath(pair.zh, 'en');
      const back = getAlternatePath(toEn, 'zh');
      expect(back).toBe(pair.zh);
    }
  });

  it('does not send an inner page back to the homepage', () => {
    expect(getAlternatePath('/services', 'en')).not.toBe('/en');
    expect(getAlternatePath('/en/contact', 'zh')).not.toBe('/');
    expect(getAlternatePath('/cases', 'en')).toBe('/en/cases');
    expect(getAlternatePath('/en/about', 'zh')).toBe('/about');
  });

  it('ignores trailing slashes, query strings, and hashes', () => {
    expect(getAlternatePath('/services/', 'en')).toBe('/en/services');
    expect(getAlternatePath('/en/contact/', 'zh')).toBe('/contact');
    expect(getAlternatePath('/about?from=footer#office', 'en')).toBe('/en/about');
    expect(getAlternatePath('https://beansmile.xifengzhu.com/en/cases?x=1', 'zh')).toBe('/cases');
  });

  it('treats the root and /en as Chinese and English homepages', () => {
    expect(getLocaleFromPath('/')).toBe('zh');
    expect(getLocaleFromPath('/en')).toBe('en');
    expect(getLocaleFromPath('/en/')).toBe('en');
    expect(getPageFromPath('/')).toBe('home');
    expect(getPageFromPath('/en')).toBe('home');
  });

  it('does not invent a third language or keep unknown tails', () => {
    expect(getAlternatePath('/ja', 'en')).toBe('/en');
    expect(getAlternatePath('/en/ja', 'zh')).toBe('/');
    expect(getAlternatePath('/services/extra', 'en')).toBe('/en');
    expect(getPageFromPath('/ja')).toBeNull();
    expect(getPageFromPath('/en/services/extra')).toBeNull();
    expect(pages).not.toContain('ja' as PageId);
  });

  it('only recognizes zh and en', () => {
    const locales: Locale[] = ['zh', 'en'];
    expect(getLocaleFromPath('/services')).toBe('zh');
    expect(locales).toEqual(['zh', 'en']);
    expect(pathFor('home', 'zh')).toBe('/');
    expect(pathFor('home', 'en')).toBe('/en');
  });
});
