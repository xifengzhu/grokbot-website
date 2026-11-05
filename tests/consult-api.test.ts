import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import worker from '../workers/index';
import { consultIdempotencyKey, handleConsultRequest } from '../workers/consult';
import { deliverConsultEmail, NOTIFY_TO, PUBLIC_EMAIL, type ResendLike } from '../workers/resend';
import type { Env } from '../workers/env';

const validBody = {
  name: 'Ada',
  company: 'Northwind',
  wechat: 'ada_wx',
  email: 'ada@northwind.example',
  need: 'Rebuild the storefront',
  requestId: '11111111-1111-4111-8111-111111111111',
};

function post(body: unknown, headers?: HeadersInit): Request {
  return new Request('https://beansmile.xifengzhu.com/api/consult', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

describe('POST /api/consult', () => {
  it('does not deliver when validation fails', async () => {
    const deliver = vi.fn();
    const response = await handleConsultRequest(post({ name: 'Ada' }), { deliver });
    expect(response.status).toBe(400);
    expect(deliver).not.toHaveBeenCalled();
    const payload = await response.json();
    expect(payload).toEqual({
      ok: false,
      code: 'validation_error',
      errors: ['company_required', 'wechat_or_email_required', 'need_required'],
    });
  });

  it('rejects wechat and email both empty without sending', async () => {
    const deliver = vi.fn();
    const response = await handleConsultRequest(
      post({ name: 'Ada', company: 'Northwind', wechat: '', email: '', need: 'Help' }),
      { deliver },
    );
    expect(response.status).toBe(400);
    expect(deliver).not.toHaveBeenCalled();
    const payload = (await response.json()) as { errors: string[] };
    expect(payload.errors).toEqual(['wechat_or_email_required']);
  });

  it('delivers a valid inquiry with a stable idempotency key', async () => {
    const deliver = vi.fn().mockResolvedValue({ ok: true, id: 'email_1' });
    const response = await handleConsultRequest(post(validBody), { deliver });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, code: 'accepted' });
    expect(deliver).toHaveBeenCalledOnce();
    expect(deliver.mock.calls[0]?.[0]).toMatchObject({
      name: 'Ada',
      company: 'Northwind',
      wechat: 'ada_wx',
      email: 'ada@northwind.example',
      need: 'Rebuild the storefront',
      idempotencyKey: 'consult/11111111-1111-4111-8111-111111111111',
    });
  });

  it('returns a human fail code when delivery throws and hides the exception text', async () => {
    const deliver = vi.fn().mockRejectedValue(new Error('stack at workers/resend.ts re_secret_value'));
    const response = await handleConsultRequest(post(validBody), { deliver });
    expect(response.status).toBe(502);
    const raw = await response.text();
    expect(JSON.parse(raw)).toEqual({ ok: false, code: 'delivery_failed' });
    expect(raw).not.toContain('re_secret_value');
    expect(raw).not.toContain('resend.ts');
    expect(raw).not.toContain('stack');
  });

  it('maps provider errors to delivery_failed without echoing the provider message', async () => {
    const deliver = vi.fn().mockResolvedValue({ ok: false, code: 'provider_error' });
    const response = await handleConsultRequest(post(validBody), { deliver });
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ ok: false, code: 'delivery_failed' });
  });

  it('rejects non-POST and bad JSON', async () => {
    const deliver = vi.fn();
    const get = await handleConsultRequest(
      new Request('https://beansmile.xifengzhu.com/api/consult', { method: 'GET' }),
      { deliver },
    );
    expect(get.status).toBe(405);
    expect(deliver).not.toHaveBeenCalled();
    const bad = await handleConsultRequest(post('{'), { deliver });
    expect(bad.status).toBe(400);
    expect(await bad.json()).toEqual({ ok: false, code: 'bad_request' });
  });
});

describe('Resend delivery', () => {
  it('fails clearly when the API key or from address is missing and does not call the SDK', async () => {
    const send = vi.fn();
    const client: ResendLike = { emails: { send } };
    const missingKey = await deliverConsultEmail(
      { RESEND_API_KEY: '', RESEND_FROM: 'Beansmile <boss@example.com>', CONSULT_TO: NOTIFY_TO },
      { ...validBody, idempotencyKey: consultIdempotencyKey(validBody.requestId) },
      client,
    );
    const missingFrom = await deliverConsultEmail(
      { RESEND_API_KEY: 'present', RESEND_FROM: '   ', CONSULT_TO: NOTIFY_TO },
      { ...validBody, idempotencyKey: 'consult/test' },
      client,
    );
    expect(missingKey).toEqual({ ok: false, code: 'not_configured' });
    expect(missingFrom).toEqual({ ok: false, code: 'not_configured' });
    expect(send).not.toHaveBeenCalled();
  });

  it('sends to the notify inbox via the SDK and checks data/error', async () => {
    const send = vi.fn().mockResolvedValue({ data: { id: 'email_123' }, error: null });
    const result = await deliverConsultEmail(
      {
        RESEND_API_KEY: 'present-not-logged',
        RESEND_FROM: 'Beansmile <boss@example.com>',
        CONSULT_TO: undefined,
      },
      {
        name: 'Ada <script>',
        company: 'Northwind',
        wechat: '',
        email: 'ada@northwind.example',
        need: 'Line one',
        idempotencyKey: 'consult/11111111-1111-4111-8111-111111111111',
      },
      { emails: { send } },
    );
    expect(result).toEqual({ ok: true, id: 'email_123' });
    const [payload, options] = send.mock.calls[0] ?? [];
    expect(payload.to).toEqual([NOTIFY_TO]);
    expect(payload.to).not.toContain(PUBLIC_EMAIL);
    expect(payload.from).toBe('Beansmile <boss@example.com>');
    expect(payload.replyTo).toBe('ada@northwind.example');
    expect(payload.html).toContain('Ada &lt;script&gt;');
    expect(payload.html).not.toContain('<script>');
    expect(payload.text).toContain('Line one');
    expect(options).toEqual({ idempotencyKey: 'consult/11111111-1111-4111-8111-111111111111' });
  });

  it('does not use the public inbox as the notification recipient', async () => {
    const send = vi.fn().mockResolvedValue({ data: { id: 'email_9' }, error: null });
    await deliverConsultEmail(
      { RESEND_API_KEY: 'present', RESEND_FROM: 'Beansmile <boss@example.com>', CONSULT_TO: PUBLIC_EMAIL },
      { name: 'A', company: 'B', wechat: 'wx', email: '', need: 'Need', idempotencyKey: 'consult/abc' },
      { emails: { send } },
    );
    expect(send.mock.calls[0]?.[0].to).toEqual([NOTIFY_TO]);
  });

  it('hides provider error details when the SDK returns error instead of throwing', async () => {
    const send = vi.fn().mockResolvedValue({
      data: null,
      error: { name: 'validation_error', message: 'invalid api key re_super_secret' },
    });
    const result = await deliverConsultEmail(
      { RESEND_API_KEY: 'present', RESEND_FROM: 'Beansmile <boss@example.com>', CONSULT_TO: NOTIFY_TO },
      { name: 'A', company: 'B', wechat: 'wx', email: '', need: 'Need', idempotencyKey: 'consult/abc' },
      { emails: { send } },
    );
    expect(result).toEqual({ ok: false, code: 'provider_error' });
    expect(JSON.stringify(result)).not.toContain('re_super_secret');
  });

  it('reads from and the key from env only — source does not hardcode the sandbox sender', () => {
    const src = readFileSync(new URL('../workers/resend.ts', import.meta.url), 'utf8');
    expect(src).toContain('RESEND_API_KEY');
    expect(src).toContain('RESEND_FROM');
    expect(src).toContain('CONSULT_TO');
    expect(src).not.toContain('onboarding@resend.dev');
    expect(src).not.toMatch(/re_[A-Za-z0-9]{8,}/);
  });
});

describe('worker routing', () => {
  it('serves static paths through assets and consult through the API', async () => {
    const fetchAsset = vi.fn(async () => new Response('page', { status: 200 }));
    const env = { ASSETS: { fetch: fetchAsset }, CONSULT_TO: NOTIFY_TO } as unknown as Env;
    const page = await worker.fetch(new Request('https://beansmile.xifengzhu.com/services'), env);
    expect(page.status).toBe(200);
    expect(fetchAsset).toHaveBeenCalledOnce();

    const missing = await worker.fetch(post(validBody), env);
    expect(missing.status).toBe(503);
    const raw = await missing.text();
    expect(JSON.parse(raw)).toEqual({ ok: false, code: 'not_configured' });
    expect(raw).not.toContain('RESEND');
    expect(raw).not.toMatch(/re_[A-Za-z0-9]/);
  });
});
