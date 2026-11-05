export interface Env {
  ASSETS: Fetcher;
  /** Plain var. Defaults in code and wrangler to the notify inbox. */
  CONSULT_TO?: string;
  /** Secret. Never commit a value. */
  RESEND_API_KEY?: string;
  /** Secret or plain var. Address on a verified Resend domain. Never hardcode. */
  RESEND_FROM?: string;
}
