-- Cabine 2.0 — schéma Supabase pour la gestion des packs (offres)
-- À exécuter une fois dans l'éditeur SQL de ton projet Supabase :
-- https://supabase.com/dashboard/project/_/sql/new

create extension if not exists "pgcrypto";

create table if not exists public.packs (
  id uuid primary key default gen_random_uuid(),
  operator text not null check (operator in ('orange', 'moov', 'mtn')),
  type text not null check (type in ('internet', 'mix', 'transfert')),
  -- category_id / category_label : uniquement pour type = 'internet'
  -- (10 Go à tout prix, Pass Illimité RS, etc. — voir src/data/passes.js)
  category_id text,
  category_label text,
  name text not null,
  data text,
  validity text,
  price integer not null check (price > 0),
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists packs_operator_type_idx
  on public.packs (operator, type, active);

-- Maintient updated_at à jour automatiquement
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists packs_set_updated_at on public.packs;
create trigger packs_set_updated_at
before update on public.packs
for each row execute function public.set_updated_at();

-- Row Level Security : lecture publique des packs actifs,
-- écriture réservée aux utilisateurs connectés (l'admin).
alter table public.packs enable row level security;

drop policy if exists "Public can read active packs" on public.packs;
create policy "Public can read active packs"
  on public.packs for select
  using (active = true);

drop policy if exists "Authenticated can read all packs" on public.packs;
create policy "Authenticated can read all packs"
  on public.packs for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can insert packs" on public.packs;
create policy "Authenticated can insert packs"
  on public.packs for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update packs" on public.packs;
create policy "Authenticated can update packs"
  on public.packs for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete packs" on public.packs;
create policy "Authenticated can delete packs"
  on public.packs for delete
  to authenticated
  using (true);
