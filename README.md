# Smart Money Concepts PDF Funnel

Production Next.js funnel for a free Smart Money Concepts PDF lead magnet and a paid $37 full PDF offer.

## Required Environment Variables

Copy `.env.example` to `.env.local` for local development and add the same values in Vercel:

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_FREE_PDF_BUCKET=
SUPABASE_FREE_PDF_PATH=
SUPABASE_PAID_PDF_BUCKET=
SUPABASE_PAID_PDF_PATH=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=
RESEND_API_KEY=
EMAIL_FROM=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
NEXT_PUBLIC_PAID_OFFER_ENABLED=
```

`NEXT_PUBLIC_SITE_URL` should be the production URL, for example `https://yourdomain.com`.
Leave `NEXT_PUBLIC_PAID_OFFER_ENABLED` empty or set to `false` while the public site is freebie-only.

## Supabase SQL

Run `supabase/migrations/20260509000000_smc_pdf_funnel.sql` in the Supabase SQL editor, or use the SQL below:

```sql
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text default 'smc_free_pdf',
  created_at timestamptz default now(),
  free_pdf_sent boolean default false,
  last_email_sent_at timestamptz
);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  stripe_customer_id text,
  stripe_session_id text unique not null,
  stripe_payment_intent_id text,
  amount integer not null,
  currency text default 'usd',
  product text default 'smc_advanced_pdf',
  status text not null,
  paid_pdf_sent boolean default false,
  created_at timestamptz default now()
);

alter table public.leads enable row level security;
alter table public.purchases enable row level security;

insert into storage.buckets (id, name, public)
values
  ('smc-free-pdf', 'smc-free-pdf', false),
  ('smc-paid-pdf', 'smc-paid-pdf', false)
on conflict (id) do update set public = excluded.public;
```

The app uses `SUPABASE_SERVICE_ROLE_KEY` only in server route handlers, so client-side RLS policies are not required for this funnel.

## Supabase Storage

Create private Supabase Storage buckets and upload the PDFs:

- Free bucket: value of `SUPABASE_FREE_PDF_BUCKET`
- Free path: value of `SUPABASE_FREE_PDF_PATH`, for example `smart-money-concepts-basic.pdf`
- Paid bucket: value of `SUPABASE_PAID_PDF_BUCKET`
- Paid path: value of `SUPABASE_PAID_PDF_PATH`, for example `smart-money-concepts-full.pdf`

Keep both buckets private. The app generates short-lived signed URLs through `/api/free-download` and `/api/paid-download`.

## Stripe Setup

1. Create a one-time product named `Smart Money Concepts Full Guide`.
2. Create a USD Price for `$37.00`.
3. Put the Stripe Price ID in `STRIPE_PRICE_ID`.
4. Add webhook endpoint: `https://yourdomain.com/api/stripe-webhook`.
5. Subscribe the endpoint to `checkout.session.completed`.
6. Put the signing secret in `STRIPE_WEBHOOK_SECRET`.

For local webhook testing:

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

## Resend Email Setup

1. Create or verify a sending domain in Resend.
2. Add `RESEND_API_KEY`.
3. Set `EMAIL_FROM`, for example `SMC Guide <hello@yourdomain.com>`.

## Admin Lead Export

The private lead export lives at `/admin`. It is not linked from the public site.

1. Set `ADMIN_PASSWORD` to the admin password you want to use.
2. Set `ADMIN_SESSION_SECRET` to a long random string.
3. Log in at `/admin`.
4. Select rows or click `Select all`.
5. Click `Download CSV` to export `email,source,created_at,free_pdf_sent,last_email_sent_at`.

## Vercel Deployment

1. Push this repo to GitHub.
2. Import the GitHub repo into Vercel.
3. Add every variable from `.env.example` to the Vercel project.
4. Deploy.
5. Point the domain to Vercel after the new deployment is ready.
6. Update Stripe webhook URL and `NEXT_PUBLIC_SITE_URL` to the final production domain.

## Test Checklist

- Submit the email form on `/`.
- Confirm a `leads` row is created or updated in Supabase.
- Confirm `/free-success` shows the free download button.
- Click the free download button and confirm a private Supabase signed URL opens.
- Confirm the free PDF email arrives.
- Log in at `/admin`, select leads, and download a CSV.
- Click the paid checkout button and complete Stripe test checkout.
- Confirm `/checkout/success?session_id=...` verifies the session before showing the paid download.
- Confirm the Stripe webhook inserts a `purchases` row.
- Confirm the paid PDF email arrives.
- Confirm `/api/paid-download?session_id=...` only works for a paid session.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
