import { describe, expect, it } from 'vitest';
import { absoluteUrl, seoFor, SITE_ORIGIN } from '../src/content/seo';
import { pathFor, type Locale, type PageId } from '../src/lib/locale';

const pages: PageId[] = ['home', 'services', 'cases', 'about', 'contact'];
const locales: Locale[] = ['zh', 'en'];

describe('per-page SEO', () => {
  it('emits title, description, and open graph for all ten urls', () => {
    expect(pages.length * locales.length).toBe(10);
    for (const page of pages) {
      for (const locale of locales) {
        const seo = seoFor(page, locale);
        expect(seo.title.trim().length).toBeGreaterThan(0);
        expect(seo.description.trim().length).toBeGreaterThan(0);
        expect(seo.og.title).toBe(seo.title);
        expect(seo.og.description).toBe(seo.description);
        expect(seo.og.type).toBe('website');
        expect(seo.og.url).toBe(absoluteUrl(pathFor(page, locale)));
        expect(seo.og.url.startsWith(SITE_ORIGIN)).toBe(true);
      }
    }
  });

  it('uses the production paths from the copy doc', () => {
    expect(seoFor('home', 'zh').og.url).toBe('https://beansmile.xifengzhu.com/');
    expect(seoFor('home', 'en').og.url).toBe('https://beansmile.xifengzhu.com/en');
    expect(seoFor('services', 'zh').og.url).toBe('https://beansmile.xifengzhu.com/services');
    expect(seoFor('services', 'en').og.url).toBe('https://beansmile.xifengzhu.com/en/services');
    expect(seoFor('cases', 'zh').og.url).toBe('https://beansmile.xifengzhu.com/cases');
    expect(seoFor('cases', 'en').og.url).toBe('https://beansmile.xifengzhu.com/en/cases');
    expect(seoFor('about', 'zh').og.url).toBe('https://beansmile.xifengzhu.com/about');
    expect(seoFor('about', 'en').og.url).toBe('https://beansmile.xifengzhu.com/en/about');
    expect(seoFor('contact', 'zh').og.url).toBe('https://beansmile.xifengzhu.com/contact');
    expect(seoFor('contact', 'en').og.url).toBe('https://beansmile.xifengzhu.com/en/contact');
  });
});
