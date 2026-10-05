-- Prepared for a dedicated Tipple Works Supabase project.
-- Do not run this against any other brand database.
-- Not applied.

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  phone text,
  email text,
  careers_email text,
  address text,
  instagram text,
  linkedin text
);

create table if not exists public.homepage_copy (
  id text primary key,
  body text
);

create table if not exists public.projects (
  slug text primary key,
  title text not null,
  category text,
  description text,
  image text,
  gallery jsonb default '[]',
  client text,
  sector text,
  discipline text,
  year text,
  featured boolean default false,
  sort_order int default 0,
  visible boolean default true
);

create table if not exists public.clients (
  id int primary key,
  name text not null,
  image text,
  category text,
  slug text,
  sort_order int default 0,
  visible boolean default true
);

create table if not exists public.testimonials (
  id int primary key,
  quote text not null,
  author text,
  position text,
  company text,
  sort_order int default 0,
  visible boolean default true
);

create table if not exists public.services (
  id text primary key,
  title text not null,
  description text,
  items jsonb default '[]',
  sort_order int default 0,
  visible boolean default true
);

create table if not exists public.leaders (
  name text primary key,
  role text,
  image text,
  sort_order int default 0,
  visible boolean default true
);

create table if not exists public.page_seo (
  path text primary key,
  title text,
  description text,
  og_image text
);
