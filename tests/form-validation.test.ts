import { describe, expect, it } from 'vitest';
import { validateConsult } from '../src/lib/form-validation';

const valid = {
  name: 'Ada',
  company: 'Northwind',
  wechat: 'ada_wx',
  email: '',
  need: 'Shopify storefront rebuild',
};

describe('consult form validation', () => {
  it('accepts a complete payload that has wechat and no email', () => {
    const result = validateConsult(valid);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual({
        name: 'Ada',
        company: 'Northwind',
        wechat: 'ada_wx',
        email: '',
        need: 'Shopify storefront rebuild',
      });
    }
  });

  it('accepts email without wechat', () => {
    const result = validateConsult({
      ...valid,
      wechat: '   ',
      email: 'ada@northwind.example',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.wechat).toBe('');
      expect(result.value.email).toBe('ada@northwind.example');
    }
  });

  it('accepts both wechat and a valid email', () => {
    const result = validateConsult({
      ...valid,
      email: 'ada@northwind.example',
    });
    expect(result.ok).toBe(true);
  });

  it('trims surrounding whitespace', () => {
    const result = validateConsult({
      name: '  Ada  ',
      company: '  Northwind ',
      wechat: '',
      email: '  ada@northwind.example  ',
      need: '  rebuild  ',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.name).toBe('Ada');
      expect(result.value.company).toBe('Northwind');
      expect(result.value.need).toBe('rebuild');
    }
  });

  it('reports every missing required field on an empty payload and does not claim success', () => {
    const result = validateConsult({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toEqual([
        'name_required',
        'company_required',
        'wechat_or_email_required',
        'need_required',
      ]);
    }
  });

  it('treats whitespace-only fields as empty', () => {
    const result = validateConsult({
      name: ' ',
      company: '\n',
      wechat: '  ',
      email: '\t',
      need: '   ',
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toContain('name_required');
      expect(result.errors).toContain('company_required');
      expect(result.errors).toContain('wechat_or_email_required');
      expect(result.errors).toContain('need_required');
    }
  });

  it('fails when wechat and email are both empty even if the other fields are filled', () => {
    const result = validateConsult({ ...valid, wechat: '', email: '' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toEqual(['wechat_or_email_required']);
    }
  });

  it('rejects an invalid email and does not also ask for wechat when the email field was filled', () => {
    const result = validateConsult({ ...valid, wechat: '', email: 'not-an-email' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toEqual(['email_invalid']);
    }
  });

  it('rejects an invalid email even when wechat is present', () => {
    const result = validateConsult({ ...valid, email: 'ada@' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toEqual(['email_invalid']);
    }
  });

  it('rejects a missing need on an otherwise valid payload', () => {
    const result = validateConsult({ ...valid, need: '' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toEqual(['need_required']);
    }
  });

  it('treats non-strings, null, and a missing body as empty strings', () => {
    expect(validateConsult(null).ok).toBe(false);
    expect(validateConsult(undefined).ok).toBe(false);
    const result = validateConsult({
      name: 1,
      company: { name: 'x' },
      wechat: null,
      email: ['a@b.co'],
      need: false,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toEqual([
        'name_required',
        'company_required',
        'wechat_or_email_required',
        'need_required',
      ]);
    }
  });
});
