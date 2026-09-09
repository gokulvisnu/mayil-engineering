-- Mayil Engineering & Traders: Supabase schema
-- Run this once in Supabase Dashboard -> SQL Editor -> New query.

create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  id text primary key default 'main' check (id = 'main'),
  company_name text not null default 'Mayil Engineering & Traders',
  phone_display text not null default '99428 03565',
  phone_raw text not null default '+919942803565',
  whatsapp_number text not null default '919080072602',
  gstin text,
  email text,
  address text,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values ('main') on conflict (id) do nothing;

create table if not exists public.milestones (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  sublabel text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('Roads', 'Public Works', 'Drainage', 'Earthwork', 'Buildings', 'Water Infrastructure')),
  location text not null,
  description text not null,
  full_details text,
  image_url text,
  scope text[] not null default '{}',
  completion_time text,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  organization text,
  project_type text,
  location text not null,
  details text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  organization text,
  content text not null,
  rating smallint not null default 5 check (rating between 1 and 5),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();
create trigger milestones_updated_at before update on public.milestones for each row execute function public.set_updated_at();
create trigger projects_updated_at before update on public.projects for each row execute function public.set_updated_at();
create trigger enquiries_updated_at before update on public.enquiries for each row execute function public.set_updated_at();
create trigger reviews_updated_at before update on public.reviews for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;
alter table public.milestones enable row level security;
alter table public.projects enable row level security;
alter table public.enquiries enable row level security;
alter table public.reviews enable row level security;

create policy "Public can read site settings" on public.site_settings for select using (true);
create policy "Public can read milestones" on public.milestones for select using (true);
create policy "Public can read published projects" on public.projects for select using (is_published = true);
create policy "Public can submit enquiries" on public.enquiries for insert with check (true);
create policy "Public can submit reviews" on public.reviews for insert with check (true);
create policy "Public can read approved reviews" on public.reviews for select using (status = 'approved');

-- Create the project-images bucket from Storage -> New bucket (public bucket),
-- or run this statement after creating it in the dashboard:
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do update set public = true;

create policy "Public can view project images"
on storage.objects for select using (bucket_id = 'project-images');
