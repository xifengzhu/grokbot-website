import type { Localized } from './copy';

export type CaseLink = {
  href: string;
  label: Localized;
};

export type CaseImage = {
  src: string;
  alt: Localized;
  /** Served below 720px. Desktop `src` stays the fallback. */
  mobileSrc?: string;
};

export type CaseStudy = {
  id: string;
  name: string;
  homeTeaser: boolean;
  type: Localized;
  summary: Localized;
  links: CaseLink[];
  media: CaseImage[];
};

const visit = { zh: '访问客户站点', en: 'Visit live site' };
const ourApps = { zh: '我们的应用', en: 'Our apps' };

export const primaryCases: CaseStudy[] = [
  {
    id: 'psylos1',
    name: 'Psylos1',
    homeTeaser: true,
    type: { zh: 'Shopify · 海外时尚', en: 'Shopify · Overseas fashion' },
    summary: {
      zh: '加拿大时尚服饰 Shopify 站。Beansmile 提供主题定制、原生功能开发、店铺性能优化与运营支持；定制内容包括弹窗行为、新品标签与购物车折扣提示等。',
      en: 'A Canada-based fashion Shopify storefront. Beansmile delivered theme customization, native feature development, storefront performance work, and operations support — including popup behavior, new-product labels, and cart discount messaging.',
    },
    links: [{ href: 'https://psylos1.com', label: visit }],
    media: [{ src: '/cases/psylos1.webp', alt: { zh: 'Psylos1', en: 'Psylos1' } }],
  },
  {
    id: 'chita',
    name: 'CHITA',
    homeTeaser: true,
    type: { zh: 'Shopify · 家居', en: 'Shopify · Home' },
    summary: {
      zh: '家居类 Shopify 独立站定制方案：主题搭建与店铺装修、基础配置、初始商品数据上传与运营支持。',
      en: 'A custom Shopify storefront plan for CHITA: theme setup and store decoration, basic configuration, initial product data upload, and operations support.',
    },
    links: [{ href: 'https://chitaliving.com/', label: visit }],
    media: [{ src: '/cases/chita.webp', alt: { zh: 'CHITA', en: 'CHITA' } }],
  },
  {
    id: 'herbdoc',
    name: 'Herbdoc',
    homeTeaser: false,
    type: { zh: '跨境 / 海外站 · 保健品', en: 'Cross-border / overseas · Supplements' },
    summary: {
      zh: 'Herbdoc.com 是面向美国市场的保健品 B2C 购物站，提供在线订购、定期订阅与促销等能力。公开介绍强调跨国协作、系统集成与当地市场合规适应。（不做销量承诺。）',
      en: 'Herbdoc.com is a U.S. B2C supplements storefront with online ordering, subscriptions, and promotions. Public materials highlight cross-border collaboration, integration capability, and local market/compliance adaptation. (No sales claims.)',
    },
    links: [{ href: 'https://www.herbdoc.com', label: visit }],
    media: [
      {
        src: '/cases/herbdoc.webp',
        mobileSrc: '/cases/herbdoc-mobile.webp',
        alt: { zh: 'Herbdoc', en: 'Herbdoc' },
      },
    ],
  },
  {
    id: 'store-clone-geofy',
    name: 'Store Clone + Geofy',
    homeTeaser: false,
    type: { zh: '自有 Shopify 应用 · 迁移 / GEO', en: 'In-house Shopify apps · Migration / GEO' },
    summary: {
      zh: 'Store Clone：面向店铺内容、集合、产品与关键店面数据的迁移工作流。Geofy：提升 Shopify SEO 与 GEO/AEO 可见性，帮助 AI 助手发现并理解店铺。本条展示我们的应用产品化能力，不编造安装量。',
      en: 'Store Clone: a focused migration workflow for store content, collections, products, and key storefront data. Geofy: GEO/AEO and SEO visibility so AI assistants can discover and understand a Shopify store. Shown as our apps’ productized capability — no install counts.',
    },
    links: [
      { href: 'https://apps.shopify.com/store-clone', label: { zh: `${ourApps.zh} · Store Clone`, en: `${ourApps.en} · Store Clone` } },
      { href: 'https://apps.shopify.com/geoify', label: { zh: `${ourApps.zh} · Geofy`, en: `${ourApps.en} · Geofy` } },
    ],
    media: [
      { src: '/cases/store-clone.webp', alt: { zh: 'Store Clone', en: 'Store Clone' } },
      { src: '/cases/geofy-ui.png', alt: { zh: 'Geofy', en: 'Geofy' } },
    ],
  },
  {
    id: 'altbasics',
    name: 'Altbasics',
    homeTeaser: true,
    type: { zh: 'Shopify', en: 'Shopify' },
    summary: {
      zh: 'Shopify 独立站定制方案：主题搭建、店铺装修、基础配置、初始商品数据上传与运营支持，并含自定义商品图上传功能。',
      en: 'A custom Shopify storefront plan: theme setup, store decoration, basic configuration, initial product data upload, operations support, and a custom product-image upload feature.',
    },
    links: [{ href: 'https://altbasics.com.cn/', label: visit }],
    media: [{ src: '/cases/altbasics.webp', alt: { zh: 'Altbasics', en: 'Altbasics' } }],
  },
];

export const homeCases: CaseStudy[] = primaryCases.filter((item) => item.homeTeaser);
