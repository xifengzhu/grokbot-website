import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const root = new URL('..', import.meta.url);

describe('wrangler and docs', () => {
  it('names the worker beansmile and enables public workers.dev previews without Access', () => {
    const raw = readFileSync(new URL('wrangler.jsonc', root), 'utf8');
    expect(raw).toMatch(/"name"\s*:\s*"beansmile"/);
    expect(raw).toMatch(/"workers_dev"\s*:\s*true/);
    expect(raw).toMatch(/"preview_urls"\s*:\s*true/);
    expect(raw).toContain('"previews"');
    expect(raw).toContain('xifengzhu520@gmail.com');
    expect(raw).not.toMatch(/"routes"/);
    expect(raw).not.toMatch(/"custom_domain"/);
    expect(raw).toMatch(/does not attach Cloudflare Access/);
    expect(raw).not.toMatch(/"access"\s*:/);
    expect(raw).not.toContain('onboarding@resend.dev');
    expect(raw).not.toMatch(/re_[A-Za-z0-9]{8,}/);
    expect(raw).not.toMatch(/"RESEND_API_KEY"\s*:/);
    expect(raw).not.toMatch(/"RESEND_FROM"\s*:/);
  });

  it('documents env names, the sandbox from placeholder, tests, and boss-only merge', () => {
    const readme = readFileSync(new URL('README.md', root), 'utf8');
    expect(readme).toContain('RESEND_API_KEY');
    expect(readme).toContain('RESEND_FROM');
    expect(readme).toContain('CONSULT_TO');
    expect(readme).toContain('xifengzhu520@gmail.com');
    expect(readme).toContain('Beansmile <onboarding@resend.dev>');
    expect(readme).toContain('npm test');
    expect(readme).toContain('npm run build');
    expect(readme).toMatch(/boss/i);
    expect(readme).not.toMatch(/re_[A-Za-z0-9]{8,}/);
    expect(readme).toMatch(/without Cloudflare Access|no Cloudflare Access|does not enable Cloudflare Access/i);
  });
});
