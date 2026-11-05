export const FIELD_ERRORS = [
  'name_required',
  'company_required',
  'wechat_or_email_required',
  'email_invalid',
  'need_required',
] as const;

export type FieldErrorCode = (typeof FIELD_ERRORS)[number];

export type ConsultValue = {
  name: string;
  company: string;
  wechat: string;
  email: string;
  need: string;
};

export type ValidationResult =
  | { ok: true; value: ConsultValue }
  | { ok: false; errors: FieldErrorCode[] };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmed(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function validateConsult(input: unknown): ValidationResult {
  const src =
    input !== null && typeof input === 'object' && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {};
  const name = asTrimmed(src.name);
  const company = asTrimmed(src.company);
  const wechat = asTrimmed(src.wechat);
  const email = asTrimmed(src.email);
  const need = asTrimmed(src.need);
  const errors: FieldErrorCode[] = [];

  if (!name) errors.push('name_required');
  if (!company) errors.push('company_required');
  if (!wechat && !email) errors.push('wechat_or_email_required');
  else if (email && !EMAIL_RE.test(email)) errors.push('email_invalid');
  if (!need) errors.push('need_required');

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, value: { name, company, wechat, email, need } };
}
