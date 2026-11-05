import { Resend } from 'resend';
import type { ConsultValue } from '../src/lib/form-validation';
import type { Env } from './env';

export const NOTIFY_TO = 'xifengzhu520@gmail.com';
export const PUBLIC_EMAIL = 'hi@beansmile.com';

export type ConsultMessage = ConsultValue & { idempotencyKey: string };

export type DeliverResult = { ok: true; id: string } | { ok: false; code: 'not_configured' | 'provider_error' };

type SendPayload = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type ResendLike = {
  emails: {
    send: (
      payload: SendPayload,
      options?: { idempotencyKey?: string },
    ) => Promise<{ data: { id?: string } | null; error: { name?: string; message?: string } | null }>;
  };
};

export function resolveConsultTo(raw: string | undefined): string {
  const value = raw?.trim() ?? '';
  if (!value || value.toLowerCase() === PUBLIC_EMAIL) return NOTIFY_TO;
  return value;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function oneLine(value: string, max = 80): string {
  return value.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

export function buildConsultMail(message: ConsultMessage, to: string, from: string): SendPayload {
  const lines = [
    'Beansmile consult form',
    `Name: ${message.name}`,
    `Company: ${message.company}`,
    `WeChat: ${message.wechat || '(not provided)'}`,
    `Email: ${message.email || '(not provided)'}`,
    'Need:',
    message.need,
  ];
  const text = lines.join('\n');
  const html = [
    '<p>Beansmile consult form</p>',
    '<ul>',
    `<li>Name: ${escapeHtml(message.name)}</li>`,
    `<li>Company: ${escapeHtml(message.company)}</li>`,
    `<li>WeChat: ${escapeHtml(message.wechat || '(not provided)')}</li>`,
    `<li>Email: ${escapeHtml(message.email || '(not provided)')}</li>`,
    '</ul>',
    `<p>${escapeHtml(message.need).replaceAll('\n', '<br>')}</p>`,
  ].join('');
  const payload: SendPayload = {
    from,
    to: [to],
    subject: `Beansmile inquiry: ${oneLine(message.company, 40)} / ${oneLine(message.name, 40)}`,
    html,
    text,
  };
  if (message.email) payload.replyTo = message.email;
  return payload;
}

export async function deliverConsultEmail(
  env: Pick<Env, 'RESEND_API_KEY' | 'RESEND_FROM' | 'CONSULT_TO'>,
  message: ConsultMessage,
  client?: ResendLike,
): Promise<DeliverResult> {
  const apiKey = env.RESEND_API_KEY?.trim() ?? '';
  const from = env.RESEND_FROM?.trim() ?? '';
  if (!apiKey || !from) {
    console.error(JSON.stringify({ message: 'consult_not_configured', missingKey: !apiKey, missingFrom: !from }));
    return { ok: false, code: 'not_configured' };
  }

  const to = resolveConsultTo(env.CONSULT_TO);
  const payload = buildConsultMail(message, to, from);
  const resend = client ?? new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send(payload, { idempotencyKey: message.idempotencyKey });
    if (error || !data?.id) {
      console.error(
        JSON.stringify({
          message: 'consult_provider_error',
          name: error && typeof error.name === 'string' ? error.name : 'unknown',
        }),
      );
      return { ok: false, code: 'provider_error' };
    }
    console.log(JSON.stringify({ message: 'consult_accepted', id: data.id }));
    return { ok: true, id: data.id };
  } catch {
    console.error(JSON.stringify({ message: 'consult_send_threw' }));
    return { ok: false, code: 'provider_error' };
  }
}
