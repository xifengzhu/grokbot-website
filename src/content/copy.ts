import type { Locale } from '../lib/locale';

export type Localized = { zh: string; en: string };

export function pick(locale: Locale, value: Localized): string {
  return value[locale];
}

export const copy = {
  nav: {
    home: { zh: '首页', en: 'Home' },
    services: { zh: '服务', en: 'Services' },
    cases: { zh: '案例', en: 'Work' },
    about: { zh: '关于我们', en: 'About' },
    contact: { zh: '联系咨询', en: 'Contact' },
    langToEn: { zh: 'English', en: 'English' },
    langToZh: { zh: '中文', en: '中文' },
    menu: { zh: '菜单', en: 'Menu' },
    primary: { zh: '主导航', en: 'Primary' },
  },
  common: {
    visitSite: { zh: '访问客户站点', en: 'Visit live site' },
    learnMore: { zh: '了解更多', en: 'Learn more' },
    brandDisplay: { zh: 'Beansmile（乐豆信息）', en: 'Beansmile' },
    enDraftBanner: { zh: '英文文案初稿，待审', en: '英文文案初稿，待审' },
    ourApps: { zh: '我们的应用', en: 'Our apps' },
    skip: { zh: '跳到主要内容', en: 'Skip to content' },
  },
  home: {
    tagline: {
      zh: 'Beansmile：帮出海品牌把 Shopify 独立站、应用与增长交付放在同一支技术团队。',
      en: 'Beansmile: Shopify storefronts, apps, and growth delivery for brands going global — one technical team.',
    },
    subhead: {
      zh: '从独立站与主题，到应用、迁移、结账与 GEO——同一支技术团队把方案落到可上线、可运营的店铺。',
      en: 'From storefronts and themes to apps, migrations, checkout, and GEO — one engineering team takes Shopify work from plan to a store you can run.',
    },
    cta: { zh: '留下咨询', en: 'Get in touch' },
    ctaSecondary: { zh: '查看服务', en: 'See our services' },
    servicesIntro: { zh: '核心服务', en: 'What we deliver' },
    servicesIntroBody: {
      zh: '面向出海品牌的 Shopify 技术交付：建站与改版、应用、迁移与国际化、结账与 B2B、以及上线后的 GEO / SEO 协同。',
      en: 'Shopify technical delivery for brands going global: storefronts, apps, migration and Markets, checkout and B2B, plus GEO/SEO after launch.',
    },
    casesIntro: { zh: '代表案例', en: 'Selected work' },
    casesIntroBody: {
      zh: '可核验的真实项目。完整名单见案例页。',
      en: 'Real projects you can verify. See the full set on the Work page.',
    },
    casesViewAll: { zh: '查看全部案例', en: 'View all work' },
  },
  services: {
    pageTitle: { zh: '服务', en: 'Services' },
    pageLead: {
      zh: 'Beansmile 专注 Shopify 技术交付：把独立站、应用、迁移、结账合规与 GEO/SEO 放在同一支团队里推进，减少交接断层。',
      en: 'Beansmile focuses on Shopify technical delivery — storefronts, apps, migrations, checkout compliance, and GEO/SEO — under one team, so fewer handoffs stall the work.',
    },
    items: [
      {
        id: 's1',
        title: { zh: 'Shopify 独立站建设与改版', en: 'Shopify storefront build and redesign' },
        body: {
          zh: '建设或改版响应式 Shopify 店铺，兼顾品牌表达、转化与商家日常操作。可从 Liquid 主题做到 Hydrogen / Headless。',
          en: 'Build or rebuild a responsive Shopify storefront that balances brand, conversion, and day-to-day merchant work — from Liquid themes to Hydrogen/headless.',
        },
      },
      {
        id: 's2',
        title: { zh: 'Shopify 应用开发', en: 'Shopify app development' },
        body: {
          zh: '公开应用、私有应用与 Admin API 集成，以及面向商家后台的工具。能力覆盖迁移、GEO/AEO、结账 VAT 等自有应用经验（如 Store Clone、Geofy、SD - Add VAT to Checkout）。',
          en: 'Public and private apps, Admin API integrations, and merchant-facing tools. Experience spans migration, GEO/AEO, and checkout VAT — including Store Clone, Geofy, and SD - Add VAT to Checkout.',
        },
      },
      {
        id: 's3',
        title: { zh: '店铺迁移与 Markets 国际化', en: 'Store migration and Markets internationalization' },
        body: {
          zh: '跨店铺或跨平台迁移产品、集合、主题与内容；并规划多市场、多语言、多币种与区域内容，支撑品牌稳定出海。迁移工作可背靠 Store Clone 应用经验。',
          en: 'Migrate products, collections, themes, and content between stores or platforms. Plan multi-market storefronts with language, currency, and regional content for global brands — supported by Store Clone experience where relevant.',
        },
      },
      {
        id: 's4',
        title: { zh: '结账、B2B 与合规', en: 'Checkout, B2B, and compliance' },
        body: {
          zh: '结账体验定制、VAT 流程、B2B 采购路径与区域合规相关实现——含面向结账场景的 EU VAT 校验应用经验（SD - Add VAT to Checkout）。',
          en: 'Checkout customization, VAT workflows, B2B buying journeys, and regional compliance work — including checkout-focused EU VAT validation experience (SD - Add VAT to Checkout).',
        },
      },
      {
        id: 's5',
        title: { zh: 'GEO / SEO 与上线后增长协同', en: 'GEO/SEO and post-launch growth support' },
        body: {
          zh: '让页面可抓取、结构清晰、适合被搜索与 AI 答案引擎理解：结构化数据、商品与集合内容、FAQ、llms.txt 等工作流。可由 Geofy 等应用支撑 GEO/AEO 可见性。不做排名或流量承诺。',
          en: 'Keep pages crawlable, structured, and answer-ready for search and AI engines — schema, product and collection content, FAQs, and llms.txt workflows. Geofy can support GEO/AEO visibility. We do not promise rankings or traffic.',
        },
      },
    ],
    secondaryHeading: { zh: '其他能力（次级）', en: 'Additional capabilities (secondary)' },
    secondaryIntro: {
      zh: 'Shopify 是本站主叙事。以下能力可按项目需要单独沟通，不作为首页主推。',
      en: 'Shopify is the primary story on this site. The capabilities below can be discussed when a project needs them; they are not homepage leads.',
    },
    secondary: [
      {
        id: 'engine',
        title: { zh: '电商引擎', en: 'Commerce engine' },
        body: {
          zh: '自研电商引擎，可集成 Web、小程序与 App，用于品牌在微信等生态内的商城快速部署。',
          en: 'An in-house commerce engine that can integrate web, mini programs, and apps for brand storefronts in ecosystems such as WeChat.',
        },
      },
      {
        id: 'miniprogram',
        title: { zh: '小程序与多端', en: 'Mini programs and multi-channel' },
        body: {
          zh: '微信小程序及相关多端交付经验，适用于需要中国市场入口的品牌与运营团队。',
          en: 'WeChat mini-program and related multi-channel delivery for brands that need a China-facing customer entry point.',
        },
      },
      {
        id: 'wechathub',
        title: { zh: 'WeChatHub', en: 'WeChatHub' },
        body: {
          zh: '面向海外场馆、交通、酒店、博物馆与票务团队的微信小程序集成方案，方便服务来华或出行的中国访客；范围含前端、API 网关规划、订单票务对接与支付流程支持。既有票务系统所有权、支付牌照审批、法务与长期运营默认另议。',
          en: 'A WeChat mini-program integration approach for overseas venues, transport, hotels, museums, and ticketing teams serving Chinese visitors. Scope can include the mini-program frontend, API gateway planning, order/ticketing integration, and payment workflow support. Existing system ownership, payment-provider approval, legal review, and long-term operations are scoped separately by default.',
        },
      },
    ],
  },
  cases: {
    pageTitle: { zh: '案例', en: 'Work' },
    pageLead: {
      zh: '以下为官网已公开展示、且本版选定的真实项目。描述基于公开资料摘要，不附编造的业绩数字。',
      en: 'Real projects already shown on Beansmile’s public site and selected for this version. Summaries stay close to public descriptions — no invented performance numbers.',
    },
  },
  about: {
    pageTitle: { zh: '关于我们', en: 'About' },
    lead: {
      zh: 'Beansmile（乐豆信息）是位于广州的软件与 Shopify 开发团队，帮助全球电商品牌建设独立站、应用、集成、适合 AI 读取的内容，以及可长期运行的数字产品。',
      en: 'Beansmile is a Guangzhou-based software and Shopify development team helping global commerce brands build storefronts, apps, integrations, AI-ready content, and long-running digital products.',
    },
    bodyWhat: {
      zh: '目前本站重点展示 Shopify 能力：应用开发、店铺建设与改版、迁移、自定义数据与集成、结账、B2B、Markets、SEO 与生成式引擎优化（GEO）。团队同时具备微信小程序、全渠道电商引擎、Rails 系统等交付经验（次级能力，见服务页）。',
      en: 'This site focuses on Shopify: apps, storefront builds and redesigns, migrations, custom data and integrations, checkout, B2B, Markets, SEO, and generative engine optimization (GEO). The team also has experience with WeChat mini programs, omnichannel commerce engines, and Rails systems (secondary — see Services).',
    },
    bodyHow: {
      zh: '我们把产品策略、设计实现、后端与前端放在同一条交付链路里，让业务需求更稳定地进入生产环境。对 Shopify 商家，方案围绕真实运营约束展开：目录结构、Markets、履约、合规、性能、分析、内容质量与商家后台工作流。',
      en: 'Product strategy, design implementation, backend, and frontend sit on one delivery path so requirements can move into production with fewer handoffs. For Shopify merchants, plans follow real operating constraints: catalog structure, Markets, fulfillment, compliance, performance, analytics, content quality, and admin workflows.',
    },
    factFounded: {
      zh: '自 2013 年起持续交付软件与电商产品。',
      en: 'Delivering software and commerce products since 2013.',
    },
    factFounder: { zh: '创始人：Leon Du / 杜立刚', en: 'Founder: Leon Du / 杜立刚' },
    addressGz: {
      zh: '广州市天河区花城大道 20 号广州远洋大厦 1302 室',
      en: 'Room 1302, Guangzhou Ocean Tower, 20 Huacheng Avenue, Tianhe District, Guangzhou, China',
    },
    addressLabel: { zh: '广州办公地址', en: 'Guangzhou office' },
    phoneLabel: { zh: '电话', en: 'Phone' },
    emailLabel: { zh: '邮箱', en: 'Email' },
    companyLabel: { zh: '公司主体', en: 'Company' },
    phone: { zh: '020-34240810', en: '020-34240810' },
    emailPublic: { zh: 'hi@beansmile.com', en: 'hi@beansmile.com' },
    cta: {
      zh: '正在规划 Shopify 建设或 GEO 升级？告诉我们店铺、市场和要解决的问题。',
      en: 'Planning a Shopify build or GEO upgrade? Tell us about the store, the market, and the problem you want to solve.',
    },
  },
  contact: {
    pageTitle: { zh: '联系咨询', en: 'Contact' },
    lead: {
      zh: '留下你的需求和联系方式。我们会收到通知，并尽快与你继续沟通——具体回复时间视排期而定，这里不做承诺。',
      en: 'Share your needs and a way to reach you. We will be notified and follow up as capacity allows — we do not promise a fixed response time here.',
    },
    directLabel: { zh: '也可以直接联系', en: 'Or reach the studio directly' },
  },
  form: {
    labelName: { zh: '姓名', en: 'Name' },
    placeholderName: { zh: '怎么称呼您', en: 'Your name' },
    labelCompany: { zh: '公司', en: 'Company' },
    placeholderCompany: { zh: '公司或品牌名', en: 'Company or brand name' },
    labelWechat: { zh: '微信', en: 'WeChat' },
    placeholderWechat: { zh: '微信号（与邮箱至少填一项）', en: 'WeChat ID (provide WeChat or email)' },
    labelEmail: { zh: '邮箱', en: 'Email' },
    placeholderEmail: { zh: 'name@company.com（与微信至少填一项）', en: 'name@company.com (provide WeChat or email)' },
    wechatOrEmailHint: { zh: '微信或邮箱至少填写一项', en: 'Provide WeChat or email (at least one)' },
    labelNeed: { zh: '需求描述', en: 'What do you need?' },
    placeholderNeed: {
      zh: '例如：独立站改版、应用开发、迁移、B2B 结账、GEO……请尽量说明现状与目标',
      en: 'e.g. storefront rebuild, app, migration, B2B checkout, GEO… Current state and goal help.',
    },
    submit: { zh: '提交咨询', en: 'Send inquiry' },
    submitting: { zh: '正在提交…', en: 'Sending…' },
    errorName: { zh: '请填写姓名', en: 'Please enter your name' },
    errorCompany: { zh: '请填写公司', en: 'Please enter your company' },
    errorWechatOrEmail: { zh: '请填写微信或邮箱', en: 'WeChat or email required' },
    errorEmail: { zh: '邮箱格式不正确', en: 'Enter a valid email address' },
    errorNeed: { zh: '请填写需求描述', en: 'Please describe what you need' },
    successTitle: { zh: '已收到你的咨询', en: 'We received your inquiry' },
    successBody: {
      zh: '谢谢。团队已收到你的信息，会按排期与你联系。无需重复提交。',
      en: 'Thank you. Your note reached our team. We will follow up as capacity allows — no need to submit again.',
    },
    failureTitle: { zh: '这次没能发出去', en: 'Something went wrong' },
    failureBody: {
      zh: '提交没有成功。请检查网络后重试；若仍失败，可电话 020-34240810 或发邮件到 hi@beansmile.com，并附上刚才填写的内容。',
      en: 'We could not send your inquiry. Check your connection and try again. If it still fails, call +86 20 3424 0810 or email hi@beansmile.com with what you typed.',
    },
    failureRetry: { zh: '再试一次', en: 'Try again' },
    requiredMark: { zh: '必填', en: 'Required' },
  },
  footer: {
    cta: { zh: '准备聊聊你的 Shopify 项目？', en: 'Ready to talk about your Shopify project?' },
    ctaButton: { zh: '去填写咨询', en: 'Go to contact' },
    blurb: {
      zh: 'Beansmile（乐豆信息）· Shopify 独立站、应用与增长交付',
      en: 'Beansmile · Shopify storefronts, apps, and growth delivery',
    },
    legalName: {
      zh: '广州乐豆信息科技有限公司',
      en: 'Guangzhou Beansmile Information Technology Co., Ltd.',
    },
    domain: { zh: 'beansmile.xifengzhu.com', en: 'beansmile.xifengzhu.com' },
    copyright: { zh: '© Beansmile（乐豆信息）', en: '© Beansmile' },
  },
  notFound: {
    title: { zh: '页面未找到', en: 'Page not found' },
    body: { zh: '这个地址没有对应页面。', en: 'There is no page at this address.' },
  },
  /**
   * Stored for the copy key, not rendered. Flags keep NBA / unauthorized trust off.
   * `[TBD]` stays as written in copy-en-v1.
   */
  gated: {
    trustSecondary: {
      zh: '[TBD: 书面授权后启用] 也曾为大型品牌交付电商与小程序相关系统（次级信任条，不进主案例叙事）。',
      en: '[TBD: enable only with written authorization] We have also delivered commerce and mini-program systems for larger brands (secondary trust only — not part of the primary case narrative).',
    },
    nba: {
      zh: '[TBD: 书面授权后启用 · 仅次级信任条] NBA 中国官方商城：基于自研电商引擎的官方授权购物相关交付（网站与微信小程序等）。无授权则整段去掉。',
      en: '[TBD: enable only with written authorization · secondary trust only] NBA China official store — commerce delivery on Beansmile’s engine (web and WeChat mini program among other surfaces). Omit entirely without authorization.',
    },
  },
} as const;
