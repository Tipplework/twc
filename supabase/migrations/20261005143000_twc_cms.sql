-- TWC CMS. Apply only on a dedicated Tipple Works Supabase project.
-- Do not run this against any other brand database.

create extension if not exists pgcrypto;

create type public.app_role as enum ('super_admin', 'editor', 'viewer');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  role public.app_role not null default 'viewer',
  created_at timestamptz not null default now()
);

create table public.site_settings (
  id int primary key default 1 check (id = 1),
  site_name text not null default 'Tipple Works Co.',
  hero_headline text,
  hero_support text,
  hero_cta text,
  positioning_before text,
  positioning_after text,
  studio_heading text,
  studio_body text,
  contact_heading text,
  contact_body text,
  email text,
  phone text,
  phone_href text,
  address text,
  instagram text,
  instagram_handle text,
  linkedin text,
  careers_email text,
  admin_email text,
  deck_url text,
  default_title text,
  default_description text,
  default_og_image text,
  updated_at timestamptz not null default now()
);

create table public.page_seo (
  path text primary key,
  title text,
  description text,
  og_image text,
  noindex boolean not null default false,
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text,
  sector text,
  year text,
  disciplines text[] not null default '{}',
  summary text,
  introduction text,
  challenge text,
  thinking text,
  strategy text,
  creative text,
  execution text,
  results text,
  cover text,
  gallery jsonb not null default '[]',
  video text,
  credits text,
  links jsonb not null default '[]',
  theme text,
  featured boolean not null default false,
  home_order int not null default 0,
  work_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  seo_title text,
  seo_description text,
  updated_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo text,
  category text,
  website text,
  project_slug text,
  visible boolean not null default true,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.leaders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text,
  bio text,
  image text,
  linkedin text,
  visible boolean not null default true,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  details text[] not null default '{}',
  visible boolean not null default true,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author text,
  role text,
  company text,
  visible boolean not null default false,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  url text not null,
  alt text,
  caption text,
  kind text not null default 'image',
  project_slug text,
  created_at timestamptz not null default now()
);

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  message text,
  created_at timestamptz not null default now()
);

insert into public.site_settings (id) values (1) on conflict do nothing;

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.page_seo enable row level security;
alter table public.projects enable row level security;
alter table public.clients enable row level security;
alter table public.leaders enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.media_assets enable row level security;
alter table public.inquiries enable row level security;

create or replace function public.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.can_edit()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_app_role() in ('super_admin', 'editor')
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_app_role() in ('super_admin', 'editor', 'viewer')
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'viewer')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create policy "public settings read" on public.site_settings for select using (true);
create policy "public seo read" on public.page_seo for select using (true);
create policy "public projects read" on public.projects for select using (status = 'published' or public.is_staff());
create policy "public clients read" on public.clients for select using (visible or public.is_staff());
create policy "public leaders read" on public.leaders for select using (visible or public.is_staff());
create policy "public services read" on public.services for select using (visible or public.is_staff());
create policy "public testimonials read" on public.testimonials for select using (visible or public.is_staff());
create policy "staff media read" on public.media_assets for select using (true);
create policy "inquiry insert" on public.inquiries for insert with check (char_length(coalesce(message, '')) < 5000);
create policy "staff inquiry read" on public.inquiries for select using (public.is_staff());

create policy "editors update settings" on public.site_settings for update using (public.can_edit()) with check (public.can_edit());
create policy "editors write seo" on public.page_seo for all using (public.can_edit()) with check (public.can_edit());
create policy "editors write projects" on public.projects for all using (public.can_edit()) with check (public.can_edit());
create policy "editors write clients" on public.clients for all using (public.can_edit()) with check (public.can_edit());
create policy "editors write leaders" on public.leaders for all using (public.can_edit()) with check (public.can_edit());
create policy "editors write services" on public.services for all using (public.can_edit()) with check (public.can_edit());
create policy "editors write testimonials" on public.testimonials for all using (public.can_edit()) with check (public.can_edit());
create policy "editors write media" on public.media_assets for all using (public.can_edit()) with check (public.can_edit());

create policy "read own profile" on public.profiles for select using (id = auth.uid() or public.current_app_role() = 'super_admin');
create policy "super admin updates roles" on public.profiles for update using (public.current_app_role() = 'super_admin');

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public media read" on storage.objects for select using (bucket_id = 'media');
create policy "editors upload media" on storage.objects for insert with check (bucket_id = 'media' and public.can_edit());
create policy "editors update media" on storage.objects for update using (bucket_id = 'media' and public.can_edit());
create policy "editors delete media" on storage.objects for delete using (bucket_id = 'media' and public.can_edit());
