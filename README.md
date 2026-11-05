# Beansmile（乐豆信息）

Bilingual marketing site for Beansmile. Static pages are built with Astro. `POST /api/consult` is a small Cloudflare Worker on the same project. Production is Workers + Static Assets (not Pages, not Next.js).

Production domain: `https://beansmile.xifengzhu.com` (already attached and proxied). **Merging to `main` is boss-only.** This repository does not turn that merge on by itself.

## Routes

| Page | 中文 | English |
|------|------|---------|
| Home | `/` | `/en` |
| Services | `/services` | `/en/services` |
| Work | `/cases` | `/en/cases` |
| About | `/about` | `/en/about` |
| Contact | `/contact` | `/en/contact` |

The language switch stays on the same page in the other locale.

## Scripts

```bash
npm test          # unit tests (locale, form validation, copy, cases, consult API)
npm run build     # astro build → dist/
npm run test:html # checks the ten built routes (run after build)
npm run dev       # Astro dev server (pages only)
npm run cf:dev    # build, then wrangler dev (pages + /api/consult)
npm run cf:dry-run
```

Node.js 22.12 or newer.

## Environment variables

Names only. Never commit values, `.env`, or `.dev.vars`.

| Name | Where | Purpose |
|------|--------|---------|
| `RESEND_API_KEY` | Worker secret | Resend API key. Server-only. |
| `RESEND_FROM` | Worker secret or var | From address on a verified Resend domain. Code reads this; it is not hardcoded. |
| `CONSULT_TO` | `wrangler.jsonc` var | Notify inbox. Set to `xifengzhu520@gmail.com`. The public address `hi@beansmile.com` is display-only and is not the notify recipient. |

Copy `.dev.vars.example` to `.dev.vars` for local `wrangler dev`. Leave `RESEND_API_KEY` empty to exercise the form **fail** state: the API responds with `not_configured` and does not include the key or a stack trace.

Until the sending domain is verified, the sandbox from address you may store in the `RESEND_FROM` secret (dashboard or `.dev.vars`, not in git) is:

`Beansmile <onboarding@resend.dev>`

Production and preview should use separate secrets. Set preview secrets with `npx wrangler preview base-config secret put RESEND_API_KEY` and the same for `RESEND_FROM` after the GitHub ↔ Workers Builds link exists. Do not put those commands' values in the repo.

## Cloudflare

Worker name in `wrangler.jsonc` is exactly `beansmile`.

- `workers_dev: true` — workers.dev stays enabled.
- `preview_urls: true` — version and preview URLs stay enabled.
- `previews.vars.CONSULT_TO` matches production so a preview does not fall back to the public inbox.
- **Previews are public.** This config does not enable Cloudflare Access.
- `beansmile.xifengzhu.com` is already attached on Cloudflare (proxied). This file does **not** declare `routes` or `custom_domain`, so a deploy does not create DNS. Binding the Worker to the GitHub repo is handled outside this change and may still be waiting on Cloudflare CI permission.

Workers Builds, once the project is linked:

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Preview command | `npx wrangler preview` |
| Production branch | `main` (boss merges) |
| Non-production branches | preview builds |

`wrangler preview` reads the `previews` block in `wrangler.jsonc`. Assets upload from `dist/` after the build command. `/api/*` runs the Worker first; HTML is static.

`og:url` is the production origin (`https://beansmile.xifengzhu.com/...`) even on a preview, so the ten canonical URLs stay stable.

## Form

Fields: name, company, WeChat or email (at least one; email is format-checked when present), need. The browser checks first; the Worker checks again. States: empty, validation error, submitting (button disabled), success, fail with retry. Success copy does not promise a reply time. Fail copy points at `020-34240810` and `hi@beansmile.com` and does not show secrets or stack traces.

Resend is called only on the Worker. The SDK result is `{ data, error }` and is checked; API errors are not thrown. Missing key or from address returns the fail path without calling Resend.
