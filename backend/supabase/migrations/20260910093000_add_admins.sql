create table if not exists public.admins (
  email text primary key check (email = lower(email)),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.admins (email, is_active)
values
  ('gokulvishnu350@gmail.com', true),
  ('mayilengineering4204@gmail.com', true)
on conflict (email) do update set is_active = true, updated_at = now();