import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const dist = join(process.cwd(), 'dist');

const pages: Array<{ file: string; url: string; lang: string; alt: string; contact: string }> = [
  { file: 'index.html', url: 'https://beansmile.xifengzhu.com/', lang: 'zh-CN', alt: '/en', contact: '/contact' },
  { file: 'services/index.html', url: 'https://beansmile.xifengzhu.com/services', lang: 'zh-CN', alt: '/en/services', contact: '/contact' },
  { file: 'cases/index.html', url: 'https://beansmile.xifengzhu.com/cases', lang: 'zh-CN', alt: '/en/cases', contact: '/contact' },
  { file: 'about/index.html', url: 'https://beansmile.xifengzhu.com/about', lang: 'zh-CN', alt: '/en/about', contact: '/contact' },
  { file: 'contact/index.html', url: 'https://beansmile.xifengzhu.com/contact', lang: 'zh-CN', alt: '/en/contact', contact: '/contact' },
  { file: 'en/index.html', url: 'https://beansmile.xifengzhu.com/en', lang: 'en', alt: '/', contact: '/en/contact' },
  { file: 'en/services/index.html', url: 'https://beansmile.xifengzhu.com/en/services', lang: 'en', alt: '/services', contact: '/en/contact' },
  { file: 'en/cases/index.html', url: 'https://beansmile.xifengzhu.com/en/cases', lang: 'en', alt: '/cases', contact: '/en/contact' },
  { file: 'en/about/index.html', url: 'https://beansmile.xifengzhu.com/en/about', lang: 'en', alt: '/about', contact: '/en/contact' },
  { file: 'en/contact/index.html', url: 'https://beansmile.xifengzhu.com/en/contact', lang: 'en', alt: '/contact', contact: '/en/contact' },
];

function decode(value: string): string {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function meta(html: string, key: string): string {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const name = tag.match(/\b(?:name|property)\s*=\s*["']([^"']+)["']/i)?.[1];
    if (name !== key) continue;
    const content = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1];
    if (content != null) return decode(content);
  }
  return '';
}

function read(file: string): string {
  return readFileSync(join(dist, file), 'utf8');
}

describe('built pages', () => {
  it('covers ten routes with SEO tags, language switch, and footer CTA', () => {
    expect(pages).toHaveLength(10);
    for (const page of pages) {
      const html = read(page.file);
      const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '');
      expect(title.length).toBeGreaterThan(0);
      expect(meta(html, 'description').length).toBeGreaterThan(0);
      expect(meta(html, 'og:title')).toBe(title);
      expect(meta(html, 'og:description').length).toBeGreaterThan(0);
      expect(meta(html, 'og:url')).toBe(page.url);
      expect(meta(html, 'og:type')).toBe('website');
      expect(html).toContain(`lang="${page.lang}"`);
      expect(html).toContain(`class="lang-switch" href="${page.alt}"`);
      expect(html).toContain(`footer-cta" href="${page.contact}"`);
      expect(html).not.toContain('beansmile.com/assets');
      expect(html).not.toContain('占位图');
      expect(html).not.toContain('[TBD');
      expect(html).not.toContain('NBA');
      expect(html).not.toContain('Shopify Partner');
      expect(html).not.toContain('Plus Partner');
      expect(html).not.toContain('投放');
      expect(html).not.toContain('香港');
      expect(html).not.toContain('日本');
      expect(html).not.toContain('Hong Kong');
      expect(html).not.toMatch(/\bJapan\b/);
      expect(html).not.toMatch(/re_[A-Za-z0-9]{8,}/);
    }
  });

  it('shows the positioning line, service entry, case teasers, and primary CTA on the Chinese home page', () => {
    const html = read('index.html');
    expect(html).toContain('Beansmile：帮出海品牌把 Shopify 独立站、应用与增长交付放在同一支技术团队。');
    expect(html).toContain('href="/services#s1"');
    expect(html).toContain('Psylos1');
    expect(html).toContain('CHITA');
    expect(html).toContain('Altbasics');
    expect(html).not.toContain('Herbdoc');
    expect(html).not.toContain('Store Clone');
    expect(html).not.toContain('电商引擎');
    expect(html).not.toContain('WeChatHub');
    expect(html).toContain('留下咨询');
    expect(html).toContain('/brand/logo.png');
    expect(html).toContain('/brand/hero-og.jpg');
    expect(html).toContain('/cases/psylos1.webp');
    expect(html).toContain('/cases/chita.webp');
    expect(html).toContain('/cases/altbasics.webp');
    expect(html).not.toContain('/cases/geofy-ui.png');
  });

  it('keeps secondary capabilities off the homepage and on the services page', () => {
    const services = read('services/index.html');
    expect(services).toContain('id="s1"');
    expect(services).toContain('id="s5"');
    expect(services).toContain('其他能力（次级）');
    expect(services).toContain('电商引擎');
    expect(services).toContain('WeChatHub');
    expect(read('en/services/index.html')).toContain('Additional capabilities (secondary)');
  });

  it('lists the five cases and both legal names with Guangzhou contact on about', () => {
    const cases = read('cases/index.html');
    for (const name of ['Psylos1', 'CHITA', 'Herbdoc', 'Store Clone + Geofy', 'Altbasics']) {
      expect(cases).toContain(name);
    }
    expect(cases).toContain('https://apps.shopify.com/store-clone');
    expect(cases).toContain('https://apps.shopify.com/geoify');
    expect(cases).toContain('/cases/herbdoc.webp');
    expect(cases).toContain('media="(max-width: 720px)"');
    expect(cases).toContain('/cases/herbdoc-mobile.webp');
    expect(cases).toContain('/cases/store-clone.webp');
    expect(cases).toContain('/cases/geofy-ui.png');
    expect(cases).not.toContain('geofy-logo');
    const about = read('about/index.html');
    expect(about).toContain('广州乐豆信息科技有限公司');
    expect(about).toContain('Guangzhou Beansmile Information Technology Co., Ltd.');
    expect(about).toContain('广州市天河区花城大道 20 号广州远洋大厦 1302 室');
    expect(about).toContain('020-34240810');
    expect(about).toContain('hi@beansmile.com');
    expect(about).toContain('自 2013 年起持续交付软件与电商产品。');
    const aboutEn = read('en/about/index.html');
    expect(aboutEn).toContain('广州市天河区花城大道 20 号广州远洋大厦 1302 室');
    expect(aboutEn).toContain('020-34240810');
    expect(aboutEn).toContain('hi@beansmile.com');
  });

  it('renders the consult form empty state with hidden error, success, and fail copy', () => {
    for (const file of ['contact/index.html', 'en/contact/index.html']) {
      const html = read(file);
      expect(html).toContain('data-consult-form');
      expect(html).toContain('data-state="empty"');
      expect(html).toContain('name="name"');
      expect(html).toContain('name="company"');
      expect(html).toContain('name="wechat"');
      expect(html).toContain('name="email"');
      expect(html).toContain('name="need"');
      for (const code of ['name_required', 'wechat_or_email_required', 'email_invalid']) {
        expect(html).toMatch(new RegExp(`data-error="${code}"[^>]*\\shidden|\\shidden[^>]*data-error="${code}"`));
      }
      expect(html).toMatch(/data-panel="success"[^>]*\shidden|\shidden[^>]*data-panel="success"/);
      expect(html).toMatch(/data-panel="fail"[^>]*\shidden|\shidden[^>]*data-panel="fail"/);
      expect(html).toContain('data-retry');
    }
    expect(read('contact/index.html')).toContain('已收到你的咨询');
    expect(read('contact/index.html')).toContain('这次没能发出去');
    expect(read('contact/index.html')).toContain('正在提交…');
    expect(read('en/index.html')).toContain('英文文案初稿，待审');
    expect(read('index.html')).not.toContain('英文文案初稿，待审');
  });

  it('ships a mobile stylesheet with the hamburger hook', () => {
    const cssFiles: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) walk(path);
        else if (path.endsWith('.css')) cssFiles.push(path);
      }
    };
    walk(dist);
    const css = cssFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
    expect(css).toContain('720px');
    expect(css).toContain('nav-toggle');
  });
});
