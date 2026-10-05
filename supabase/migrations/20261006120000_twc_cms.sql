-- Tipple Works Co. CMS
-- Apply ONLY on a dedicated Tipple Works Supabase project.
-- Do not apply to Sula, HOST, or any other brand database.
-- Do not apply to project ref ymfwejugtpzawklrlpss.
-- This file has not been applied by the repository.

create extension if not exists pgcrypto;

do $$ begin
  create type public.app_role as enum ('super_admin', 'editor', 'viewer');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.publish_status as enum ('draft', 'published');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text,
  role public.app_role not null default 'viewer',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  public_url text not null,
  filename text not null,
  mime_type text,
  width integer,
  height integer,
  file_size bigint,
  alt_text text,
  caption text,
  created_at timestamptz not null default now(),
  created_by uuid references public.profiles (id)
);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  site_name text not null default 'Tipple Works Co.',
  phone text,
  phone_href text,
  email text,
  about_email text,
  careers_email text,
  admin_email text,
  address text,
  instagram text,
  instagram_handle text,
  instagram_floating text,
  instagram_contact text,
  linkedin text,
  linkedin_floating text,
  footer_copy text,
  copyright text,
  draft jsonb,
  has_unpublished_changes boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id)
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  title text not null,
  status public.publish_status not null default 'draft',
  content jsonb not null default '{}'::jsonb,
  draft jsonb,
  has_unpublished_changes boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id),
  constraint pages_known_path check (
    path in (
      '/',
      '/about',
      '/work',
      '/services',
      '/contact',
      '/privacy-policy',
      '/terms-of-service'
    )
  )
);

create table if not exists public.homepage_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  heading text,
  body text,
  visible boolean not null default true,
  sort_order integer not null default 0,
  settings jsonb not null default '{}'::jsonb,
  draft jsonb,
  has_unpublished_changes boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id),
  constraint homepage_known_section check (
    section_key in ('hero', 'featured', 'clients', 'testimonials', 'services', 'footer')
  )
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null default '',
  description text not null default '',
  client text,
  sector text,
  discipline text,
  year text,
  hero_asset_id uuid references public.assets (id),
  video_url text,
  video_confirmed boolean not null default false,
  featured boolean not null default false,
  featured_order integer,
  work_order integer not null default 0,
  visible boolean not null default true,
  status public.publish_status not null default 'draft',
  seo_title text,
  seo_description text,
  og_asset_id uuid references public.assets (id),
  draft jsonb,
  has_unpublished_changes boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id)
);

create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  asset_id uuid not null references public.assets (id),
  caption text,
  sort_order integer not null default 0,
  visible boolean not null default true
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_asset_id uuid references public.assets (id),
  category text not null default '',
  project_slug text,
  website_url text,
  visible boolean not null default true,
  sort_order integer not null default 0,
  status public.publish_status not null default 'draft',
  draft jsonb,
  has_unpublished_changes boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id)
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author text not null,
  position text,
  company text,
  visible boolean not null default true,
  sort_order integer not null default 0,
  status public.publish_status not null default 'draft',
  draft jsonb,
  has_unpublished_changes boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id)
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  icon_key text not null default 'brush',
  visible boolean not null default true,
  sort_order integer not null default 0,
  status public.publish_status not null default 'draft',
  draft jsonb,
  has_unpublished_changes boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id)
);

create table if not exists public.service_items (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services (id) on delete cascade,
  name text not null,
  icon_key text not null default 'palette',
  sort_order integer not null default 0,
  visible boolean not null default true
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  bio text,
  image_asset_id uuid references public.assets (id),
  linkedin text,
  visible boolean not null default true,
  sort_order integer not null default 0,
  status public.publish_status not null default 'draft',
  draft jsonb,
  has_unpublished_changes boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id)
);

create table if not exists public.nav_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  placement text not null,
  visible boolean not null default true,
  sort_order integer not null default 0,
  status public.publish_status not null default 'published',
  draft jsonb,
  has_unpublished_changes boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id),
  constraint nav_known_href check (
    href in (
      '/',
      '/about',
      '/work',
      '/services',
      '/contact',
      '/privacy-policy',
      '/terms-of-service'
    )
  ),
  constraint nav_known_placement check (placement in ('header', 'footer', 'legal'))
);

create table if not exists public.page_seo (
  path text primary key,
  title text,
  description text,
  canonical text,
  og_asset_id uuid references public.assets (id),
  indexable boolean not null default true,
  draft jsonb,
  has_unpublished_changes boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id)
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id),
  action text not null,
  entity_type text not null,
  entity_id text,
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now()
);

create index if not exists projects_work_order_idx on public.projects (work_order);
create index if not exists projects_featured_idx on public.projects (featured, featured_order);
create index if not exists project_media_project_idx on public.project_media (project_id, sort_order);
create index if not exists clients_order_idx on public.clients (sort_order);
create index if not exists audit_log_created_idx on public.audit_log (created_at desc);

create or replace function public.current_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid() and active = true
$$;

create or replace function public.can_edit()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_role() in ('super_admin', 'editor')
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_role() = 'super_admin'
$$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  if auth.uid() is not null and tg_table_name <> 'profiles' then
    new.updated_by = auth.uid();
  end if;
  return new;
end;
$$;

create or replace function public.audit_row()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  old_row jsonb;
  new_row jsonb;
  action_name text;
begin
  if tg_op = 'INSERT' then
    new_row = to_jsonb(new);
    action_name = case when tg_table_name = 'assets' then 'upload' else 'create' end;
  elsif tg_op = 'UPDATE' then
    old_row = to_jsonb(old);
    new_row = to_jsonb(new);
    action_name = 'edit';
    if old_row ? 'status' and old_row->>'status' is distinct from new_row->>'status' then
      action_name = case when new_row->>'status' = 'published' then 'publish' else 'unpublish' end;
    elsif (
      (old_row ? 'sort_order' and old_row->>'sort_order' is distinct from new_row->>'sort_order')
      or (old_row ? 'featured_order' and old_row->>'featured_order' is distinct from new_row->>'featured_order')
      or (old_row ? 'work_order' and old_row->>'work_order' is distinct from new_row->>'work_order')
    ) then
      action_name = 'reorder';
    end if;
  else
    old_row = to_jsonb(old);
    action_name = 'delete';
  end if;

  insert into public.audit_log (user_id, action, entity_type, entity_id, before, after)
  values (
    auth.uid(),
    action_name,
    tg_table_name,
    coalesce(new_row->>'id', old_row->>'id', new_row->>'path', old_row->>'path', new_row->>'section_key', old_row->>'section_key'),
    old_row,
    new_row
  );

  return coalesce(new, old);
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(coalesce(new.email, 'user'), '@', 1)),
    'viewer'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'profiles', 'site_settings', 'pages', 'homepage_sections', 'projects',
    'clients', 'testimonials', 'services', 'team_members', 'nav_links', 'page_seo'
  ]
  loop
    execute format('drop trigger if exists touch_%1$s on public.%1$s', tbl);
    execute format(
      'create trigger touch_%1$s before update on public.%1$s for each row execute function public.touch_updated_at()',
      tbl
    );
  end loop;

  foreach tbl in array array[
    'profiles', 'assets', 'site_settings', 'pages', 'homepage_sections', 'projects',
    'project_media', 'clients', 'testimonials', 'services', 'service_items',
    'team_members', 'nav_links', 'page_seo'
  ]
  loop
    execute format('drop trigger if exists audit_%1$s on public.%1$s', tbl);
    execute format(
      'create trigger audit_%1$s after insert or update or delete on public.%1$s for each row execute function public.audit_row()',
      tbl
    );
  end loop;
end $$;

alter table public.profiles enable row level security;
alter table public.assets enable row level security;
alter table public.site_settings enable row level security;
alter table public.pages enable row level security;
alter table public.homepage_sections enable row level security;
alter table public.projects enable row level security;
alter table public.project_media enable row level security;
alter table public.clients enable row level security;
alter table public.testimonials enable row level security;
alter table public.services enable row level security;
alter table public.service_items enable row level security;
alter table public.team_members enable row level security;
alter table public.nav_links enable row level security;
alter table public.page_seo enable row level security;
alter table public.audit_log enable row level security;

grant usage on schema public to anon, authenticated;
grant execute on function public.current_role() to anon, authenticated;
grant execute on function public.can_edit() to anon, authenticated;
grant execute on function public.is_super_admin() to anon, authenticated;

grant select on public.profiles to authenticated;
grant update on public.profiles to authenticated;

grant select on public.assets, public.site_settings, public.pages, public.homepage_sections,
  public.projects, public.project_media, public.clients, public.testimonials, public.services,
  public.service_items, public.team_members, public.nav_links, public.page_seo
to anon, authenticated;

grant insert, update, delete on public.assets, public.site_settings, public.pages, public.homepage_sections,
  public.projects, public.project_media, public.clients, public.testimonials, public.services,
  public.service_items, public.team_members, public.nav_links, public.page_seo
to authenticated;

grant select on public.audit_log to authenticated;

-- Profiles: staff can read names. Only a super admin can change roles.
drop policy if exists profiles_staff_read on public.profiles;
create policy profiles_staff_read on public.profiles
for select to authenticated
using (public.current_role() is not null);

drop policy if exists profiles_super_update on public.profiles;
create policy profiles_super_update on public.profiles
for update to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

-- Assets are website images. Writes are editors and super admins.
drop policy if exists assets_public_read on public.assets;
create policy assets_public_read on public.assets
for select to anon, authenticated
using (true);

drop policy if exists assets_staff_write on public.assets;
create policy assets_staff_write on public.assets
for insert to authenticated
with check (public.can_edit());

drop policy if exists assets_staff_update on public.assets;
create policy assets_staff_update on public.assets
for update to authenticated
using (public.can_edit())
with check (public.can_edit());

drop policy if exists assets_staff_delete on public.assets;
create policy assets_staff_delete on public.assets
for delete to authenticated
using (public.can_edit());

-- Published, visible rows are public. Staff can read drafts. Editors write.
drop policy if exists settings_public_read on public.site_settings;
create policy settings_public_read on public.site_settings
for select to anon, authenticated
using (true);

drop policy if exists settings_staff_write on public.site_settings;
create policy settings_staff_write on public.site_settings
for update to authenticated
using (public.can_edit())
with check (public.can_edit());

drop policy if exists pages_public_read on public.pages;
create policy pages_public_read on public.pages
for select to anon, authenticated
using (status = 'published');

drop policy if exists pages_staff_read on public.pages;
create policy pages_staff_read on public.pages
for select to authenticated
using (public.current_role() is not null);

drop policy if exists pages_staff_insert on public.pages;
create policy pages_staff_insert on public.pages
for insert to authenticated
with check (public.can_edit());

drop policy if exists pages_staff_update on public.pages;
create policy pages_staff_update on public.pages
for update to authenticated
using (public.can_edit())
with check (public.can_edit());

drop policy if exists pages_staff_delete on public.pages;
create policy pages_staff_delete on public.pages
for delete to authenticated
using (public.can_edit());

drop policy if exists home_public_read on public.homepage_sections;
create policy home_public_read on public.homepage_sections
for select to anon, authenticated
using (true);

drop policy if exists home_staff_write on public.homepage_sections;
create policy home_staff_write on public.homepage_sections
for update to authenticated
using (public.can_edit())
with check (public.can_edit());

drop policy if exists projects_public_read on public.projects;
create policy projects_public_read on public.projects
for select to anon, authenticated
using (status = 'published' and visible = true);

drop policy if exists projects_staff_read on public.projects;
create policy projects_staff_read on public.projects
for select to authenticated
using (public.current_role() is not null);

drop policy if exists projects_staff_insert on public.projects;
create policy projects_staff_insert on public.projects
for insert to authenticated
with check (public.can_edit());

drop policy if exists projects_staff_update on public.projects;
create policy projects_staff_update on public.projects
for update to authenticated
using (public.can_edit())
with check (public.can_edit());

drop policy if exists projects_staff_delete on public.projects;
create policy projects_staff_delete on public.projects
for delete to authenticated
using (public.can_edit());

drop policy if exists project_media_public_read on public.project_media;
create policy project_media_public_read on public.project_media
for select to anon, authenticated
using (
  visible = true
  and exists (
    select 1 from public.projects p
    where p.id = project_id and p.status = 'published' and p.visible = true
  )
);

drop policy if exists project_media_staff_read on public.project_media;
create policy project_media_staff_read on public.project_media
for select to authenticated
using (public.current_role() is not null);

drop policy if exists project_media_staff_write on public.project_media;
create policy project_media_staff_write on public.project_media
for insert to authenticated
with check (public.can_edit());

drop policy if exists project_media_staff_update on public.project_media;
create policy project_media_staff_update on public.project_media
for update to authenticated
using (public.can_edit())
with check (public.can_edit());

drop policy if exists project_media_staff_delete on public.project_media;
create policy project_media_staff_delete on public.project_media
for delete to authenticated
using (public.can_edit());

-- Repeat the published-read / staff-read / editor-write pattern.
do $$
declare
  tbl text;
begin
  foreach tbl in array array['clients', 'testimonials', 'services', 'team_members', 'nav_links']
  loop
    execute format('drop policy if exists %1$s_public_read on public.%1$s', tbl);
    execute format(
      'create policy %1$s_public_read on public.%1$s for select to anon, authenticated using (status = ''published'' and visible = true)',
      tbl
    );
    execute format('drop policy if exists %1$s_staff_read on public.%1$s', tbl);
    execute format(
      'create policy %1$s_staff_read on public.%1$s for select to authenticated using (public.current_role() is not null)',
      tbl
    );
    execute format('drop policy if exists %1$s_staff_insert on public.%1$s', tbl);
    execute format(
      'create policy %1$s_staff_insert on public.%1$s for insert to authenticated with check (public.can_edit())',
      tbl
    );
    execute format('drop policy if exists %1$s_staff_update on public.%1$s', tbl);
    execute format(
      'create policy %1$s_staff_update on public.%1$s for update to authenticated using (public.can_edit()) with check (public.can_edit())',
      tbl
    );
    execute format('drop policy if exists %1$s_staff_delete on public.%1$s', tbl);
    execute format(
      'create policy %1$s_staff_delete on public.%1$s for delete to authenticated using (public.can_edit())',
      tbl
    );
  end loop;
end $$;

drop policy if exists service_items_public_read on public.service_items;
create policy service_items_public_read on public.service_items
for select to anon, authenticated
using (
  visible = true
  and exists (
    select 1 from public.services s
    where s.id = service_id and s.status = 'published' and s.visible = true
  )
);

drop policy if exists service_items_staff_read on public.service_items;
create policy service_items_staff_read on public.service_items
for select to authenticated
using (public.current_role() is not null);

drop policy if exists service_items_staff_write on public.service_items;
create policy service_items_staff_write on public.service_items
for insert to authenticated
with check (public.can_edit());

drop policy if exists service_items_staff_update on public.service_items;
create policy service_items_staff_update on public.service_items
for update to authenticated
using (public.can_edit())
with check (public.can_edit());

drop policy if exists service_items_staff_delete on public.service_items;
create policy service_items_staff_delete on public.service_items
for delete to authenticated
using (public.can_edit());

drop policy if exists seo_public_read on public.page_seo;
create policy seo_public_read on public.page_seo
for select to anon, authenticated
using (true);

drop policy if exists seo_staff_insert on public.page_seo;
create policy seo_staff_insert on public.page_seo
for insert to authenticated
with check (public.can_edit());

drop policy if exists seo_staff_update on public.page_seo;
create policy seo_staff_update on public.page_seo
for update to authenticated
using (public.can_edit())
with check (public.can_edit());

drop policy if exists seo_staff_delete on public.page_seo;
create policy seo_staff_delete on public.page_seo
for delete to authenticated
using (public.can_edit());

drop policy if exists audit_staff_read on public.audit_log;
create policy audit_staff_read on public.audit_log
for select to authenticated
using (public.current_role() is not null);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'website',
  'website',
  true,
  52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do nothing;

drop policy if exists website_public_read on storage.objects;
create policy website_public_read on storage.objects
for select to anon, authenticated
using (bucket_id = 'website');

drop policy if exists website_staff_insert on storage.objects;
create policy website_staff_insert on storage.objects
for insert to authenticated
with check (bucket_id = 'website' and public.can_edit());

drop policy if exists website_staff_update on storage.objects;
create policy website_staff_update on storage.objects
for update to authenticated
using (bucket_id = 'website' and public.can_edit())
with check (bucket_id = 'website' and public.can_edit());

drop policy if exists website_staff_delete on storage.objects;
create policy website_staff_delete on storage.objects
for delete to authenticated
using (bucket_id = 'website' and public.can_edit());

-- Anonymous clients cannot read draft payloads, even on a published row.
revoke select on public.projects from anon;
grant select (
  id, slug, title, category, description, client, sector, discipline, year,
  hero_asset_id, video_url, video_confirmed, featured, featured_order, work_order,
  visible, status, seo_title, seo_description, og_asset_id, created_at, updated_at
) on public.projects to anon;

revoke select on public.site_settings from anon;
grant select (
  id, site_name, phone, phone_href, email, about_email, careers_email, admin_email, address,
  instagram, instagram_handle, instagram_floating, instagram_contact, linkedin, linkedin_floating,
  footer_copy, copyright, updated_at
) on public.site_settings to anon;

revoke select on public.pages from anon;
grant select (id, path, title, status, content, updated_at) on public.pages to anon;

revoke select on public.homepage_sections from anon;
grant select (id, section_key, heading, body, visible, sort_order, settings, updated_at) on public.homepage_sections to anon;

revoke select on public.clients from anon;
grant select (id, name, logo_asset_id, category, project_slug, website_url, visible, sort_order, status, updated_at) on public.clients to anon;

revoke select on public.testimonials from anon;
grant select (id, quote, author, position, company, visible, sort_order, status, updated_at) on public.testimonials to anon;

revoke select on public.services from anon;
grant select (id, slug, title, description, icon_key, visible, sort_order, status, updated_at) on public.services to anon;

revoke select on public.team_members from anon;
grant select (id, name, role, bio, image_asset_id, linkedin, visible, sort_order, status, updated_at) on public.team_members to anon;

revoke select on public.nav_links from anon;
grant select (id, label, href, placement, visible, sort_order, status, updated_at) on public.nav_links to anon;

revoke select on public.page_seo from anon;
grant select (path, title, description, canonical, og_asset_id, indexable, updated_at) on public.page_seo to anon;

-- First super admin, after the user exists in Authentication:
-- update public.profiles
-- set role = 'super_admin', active = true
-- where email = 'you@tippleworks.com';
-- New signups become viewers. They cannot promote themselves.
