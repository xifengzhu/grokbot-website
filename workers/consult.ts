import { validateConsult, type FieldErrorCode } from '../src/lib/form-validation';
import { deliverConsultEmail, type ConsultMessage, type DeliverResult } from './resend';
import type { Env } from './env';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MAX_BODY = 20_000;

export type ConsultDeps = {
  deliver: (message: ConsultMessage) => Promise<DeliverResult>;
};

export function isConsultPath(pathname: string): boolean {
  return pathname === '/api/consult' || pathname === '/api/consult/';
}

export function consultIdempotencyKey(requestId: unknown): string {
  if (typeof requestId === 'string' && UUID_RE.test(requestId)) {
    return `consult/${requestId.toLowerCase()}`;
  }
  return `consult/${crypto.randomUUID()}`;
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  });
}

async function readJson(request: Request): Promise<{ ok: true; value: unknown } | { ok: false }> {
  const claimed = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(claimed) && claimed > MAX_BODY) return { ok: false };
  const type = (request.headers.get('content-type') ?? '').toLowerCase();
  if (!type.includes('application/json')) return { ok: false };
  const text = await request.text();
  if (text.length > MAX_BODY || !text.trim()) return { ok: false };
  try {
    return { ok: true, value: JSON.parse(text) as unknown };
  } catch {
    return { ok: false };
  }
}

export async function handleConsultRequest(request: Request, deps: ConsultDeps): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ ok: false, code: 'method_not_allowed' }, 405);
  }

  const parsed = await readJson(request);
  if (!parsed.ok) return json({ ok: false, code: 'bad_request' }, 400);

  const result = validateConsult(parsed.value);
  if (!result.ok) {
    const errors: FieldErrorCode[] = result.errors;
    return json({ ok: false, code: 'validation_error', errors }, 400);
  }

  const requestId =
    parsed.value !== null && typeof parsed.value === 'object' && 'requestId' in parsed.value
      ? (parsed.value as { requestId?: unknown }).requestId
      : undefined;

  let outcome: DeliverResult;
  try {
    outcome = await deps.deliver({
      ...result.value,
      idempotencyKey: consultIdempotencyKey(requestId),
    });
  } catch {
    console.error(JSON.stringify({ message: 'consult_deliver_threw' }));
    return json({ ok: false, code: 'delivery_failed' }, 502);
  }

  if (outcome.ok) return json({ ok: true, code: 'accepted' }, 200);
  if (outcome.code === 'not_configured') return json({ ok: false, code: 'not_configured' }, 503);
  return json({ ok: false, code: 'delivery_failed' }, 502);
}

export function consultDeps(env: Env): ConsultDeps {
  return {
    deliver: (message) => deliverConsultEmail(env, message),
  };
}
