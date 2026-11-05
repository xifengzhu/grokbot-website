import { describe, expect, it } from 'vitest';
import { copy } from '../src/content/copy';
import { flags } from '../src/content/flags';
import { visibleCopyBlob } from '../src/content/visibility';

describe('copy keys', () => {
  it('uses the confirmed Chinese tagline and the English tagline', () => {
    expect(copy.home.tagline.zh).toBe(
      'Beansmile：帮出海品牌把 Shopify 独立站、应用与增长交付放在同一支技术团队。',
    );
    expect(copy.home.tagline.en).toBe(
      'Beansmile: Shopify storefronts, apps, and growth delivery for brands going global — one technical team.',
    );
  });

  it('keeps the confirmed legal name, Guangzhou contact, and public email', () => {
    expect(copy.footer.legalName.zh).toBe('广州乐豆信息科技有限公司');
    expect(copy.footer.legalName.en).toBe('Guangzhou Beansmile Information Technology Co., Ltd.');
    expect(copy.about.addressGz.zh).toBe('广州市天河区花城大道 20 号广州远洋大厦 1302 室');
    expect(copy.about.phone.zh).toBe('020-34240810');
    expect(copy.about.phone.en).toBe('020-34240810');
    expect(copy.about.emailPublic.zh).toBe('hi@beansmile.com');
    expect(copy.about.emailPublic.en).toBe('hi@beansmile.com');
  });

  it('lists exactly five primary services and three secondary capabilities', () => {
    expect(copy.services.items.map((item) => item.title.zh)).toEqual([
      'Shopify 独立站建设与改版',
      'Shopify 应用开发',
      '店铺迁移与 Markets 国际化',
      '结账、B2B 与合规',
      'GEO / SEO 与上线后增长协同',
    ]);
    expect(copy.services.secondary.map((item) => item.title.zh)).toEqual([
      '电商引擎',
      '小程序与多端',
      'WeChatHub',
    ]);
  });

  it('has bilingual form state copy for empty-field errors, submitting, success, and failure', () => {
    for (const locale of ['zh', 'en'] as const) {
      expect(copy.form.errorName[locale].length).toBeGreaterThan(0);
      expect(copy.form.errorCompany[locale].length).toBeGreaterThan(0);
      expect(copy.form.errorWechatOrEmail[locale].length).toBeGreaterThan(0);
      expect(copy.form.errorEmail[locale].length).toBeGreaterThan(0);
      expect(copy.form.errorNeed[locale].length).toBeGreaterThan(0);
      expect(copy.form.submitting[locale].length).toBeGreaterThan(0);
      expect(copy.form.successTitle[locale].length).toBeGreaterThan(0);
      expect(copy.form.successBody[locale].length).toBeGreaterThan(0);
      expect(copy.form.failureTitle[locale].length).toBeGreaterThan(0);
      expect(copy.form.failureBody[locale]).toContain('hi@beansmile.com');
      expect(copy.form.failureRetry[locale].length).toBeGreaterThan(0);
    }
  });

  it('keeps gated TBD copy out of the visible blob while flags stay off', () => {
    expect(flags.showNba).toBe(false);
    expect(flags.showPartner).toBe(false);
    expect(flags.showAdsTeam).toBe(false);
    expect(copy.gated.nba.zh).toContain('[TBD');
    expect(copy.gated.nba.en).toContain('[TBD');
    expect(copy.gated.trustSecondary.zh).toContain('[TBD');
    const visible = visibleCopyBlob();
    expect(visible).not.toContain('[TBD');
    expect(visible).not.toContain('NBA');
    expect(visible).not.toContain('Shopify Partner');
    expect(visible).not.toContain('Plus Partner');
    expect(visible).not.toContain('投放');
    expect(visible).not.toContain('香港');
    expect(visible).not.toContain('日本');
    expect(visible).not.toContain('Hong Kong');
    expect(visible).not.toContain('Japan');
  });
});
