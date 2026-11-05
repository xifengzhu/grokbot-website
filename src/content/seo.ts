import { pathFor, type Locale, type PageId } from '../lib/locale';

export const SITE_ORIGIN = 'https://beansmile.xifengzhu.com';

export type SeoEntry = {
  title: string;
  description: string;
  og: {
    title: string;
    description: string;
    url: string;
    type: 'website';
  };
};

const pages: Record<PageId, Record<Locale, { title: string; description: string }>> = {
  home: {
    zh: {
      title: 'Beansmile（乐豆信息）：出海品牌的 Shopify 独立站、应用与增长交付',
      description:
        'Beansmile 帮出海品牌把 Shopify 独立站、应用与增长交付放在同一支技术团队。查看服务、真实案例，并留下咨询。',
    },
    en: {
      title: 'Beansmile: Shopify storefronts, apps, and growth delivery for brands going global',
      description:
        'Beansmile delivers Shopify storefronts, apps, and growth work through one technical team. Explore services, real case studies, and get in touch.',
    },
  },
  services: {
    zh: {
      title: 'Shopify 服务｜独立站、应用、迁移、结账与 GEO｜Beansmile',
      description:
        '了解 Beansmile 的五项核心 Shopify 服务：独立站建设与改版、应用开发、迁移与 Markets、结账与 B2B、GEO/SEO 协同。',
    },
    en: {
      title: 'Shopify services — storefronts, apps, migration, checkout, GEO｜Beansmile',
      description:
        'Beansmile’s five core Shopify services: storefront build and redesign, app development, migration and Markets, checkout and B2B, and GEO/SEO support.',
    },
  },
  cases: {
    zh: {
      title: '案例｜Psylos1、CHITA、Herbdoc 等真实项目｜Beansmile',
      description: '浏览 Beansmile 已公开展示的 Shopify 与海外电商项目摘要，建立可核验的信任。',
    },
    en: {
      title: 'Work｜Psylos1, CHITA, Herbdoc, and more｜Beansmile',
      description: 'Browse public Shopify and overseas commerce projects from Beansmile — summaries you can verify.',
    },
  },
  about: {
    zh: {
      title: '关于 Beansmile（乐豆信息）｜广州 Shopify 技术团队',
      description: 'Beansmile 自 2013 年起交付软件与电商产品，专注 Shopify 独立站、应用、迁移、结账与 GEO。',
    },
    en: {
      title: 'About Beansmile｜Guangzhou Shopify engineering team',
      description:
        'Beansmile has delivered software and commerce products since 2013, focused on Shopify storefronts, apps, migrations, checkout, and GEO.',
    },
  },
  contact: {
    zh: {
      title: '联系咨询｜Beansmile',
      description: '填写姓名、公司、微信或邮箱与需求描述，向 Beansmile 提交 Shopify 相关咨询。',
    },
    en: {
      title: 'Contact｜Beansmile',
      description:
        'Send Beansmile a Shopify inquiry with your name, company, WeChat or email, and a short description of what you need.',
    },
  },
};

export function absoluteUrl(path: string): string {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

export function seoFor(page: PageId, locale: Locale): SeoEntry {
  const entry = pages[page][locale];
  const url = absoluteUrl(pathFor(page, locale));
  return {
    title: entry.title,
    description: entry.description,
    og: {
      title: entry.title,
      description: entry.description,
      url,
      type: 'website',
    },
  };
}

export const SEO_PAGES: PageId[] = ['home', 'services', 'cases', 'about', 'contact'];
export const SEO_LOCALES: Locale[] = ['zh', 'en'];
