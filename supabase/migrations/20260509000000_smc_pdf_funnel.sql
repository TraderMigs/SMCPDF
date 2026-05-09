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
