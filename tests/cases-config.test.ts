import { describe, expect, it } from 'vitest';
import { homeCases, primaryCases } from '../src/content/cases';

describe('case studies', () => {
  it('lists the five confirmed primary cases in order', () => {
    expect(primaryCases.map((item) => item.name)).toEqual([
      'Psylos1',
      'CHITA',
      'Herbdoc',
      'Store Clone + Geofy',
      'Altbasics',
    ]);
  });

  it('teases only Psylos1, CHITA, and Altbasics on the homepage', () => {
    expect(homeCases.map((item) => item.name)).toEqual(['Psylos1', 'CHITA', 'Altbasics']);
  });

  it('points at the confirmed public urls and does not invent metrics', () => {
    expect(primaryCases[0]?.links.map((link) => link.href)).toEqual(['https://psylos1.com']);
    expect(primaryCases[1]?.links.map((link) => link.href)).toEqual(['https://chitaliving.com/']);
    expect(primaryCases[2]?.links.map((link) => link.href)).toEqual(['https://www.herbdoc.com']);
    expect(primaryCases[3]?.links.map((link) => link.href)).toEqual([
      'https://apps.shopify.com/store-clone',
      'https://apps.shopify.com/geoify',
    ]);
    expect(primaryCases[4]?.links.map((link) => link.href)).toEqual(['https://altbasics.com.cn/']);

    const blob = JSON.stringify(primaryCases);
    expect(blob).not.toMatch(/\d+\s*%/);
    expect(blob).not.toMatch(/\$\d/);
    expect(blob).not.toMatch(/转化率|营收|搜索量/);
    expect(blob).not.toMatch(/revenue|conversion rate/i);
    expect(blob).not.toContain('Ancosti');
  });
});
