-- Run in Supabase SQL editor: https://supabase.com/dashboard → SQL → New query

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  text text not null,
  stars smallint not null check (stars >= 1 and stars <= 5),
  created_at timestamptz not null default now()
);

create index if not exists reviews_created_at_idx on public.reviews (created_at desc);

alter table public.reviews enable row level security;

-- Public read / insert (anon key). Tighten later with rate limits or Edge Functions if needed.
drop policy if exists "reviews_select_public" on public.reviews;
create policy "reviews_select_public" on public.reviews for select using (true);

drop policy if exists "reviews_insert_public" on public.reviews;
create policy "reviews_insert_public" on public.reviews for insert with check (true);
