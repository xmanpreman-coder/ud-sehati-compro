-- Supabase SQL – Schema for UD. SEHATI
-- Idempotent: safe to re-run

-- Extensions
create extension if not exists pgcrypto;

-- Categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  description text,
  price numeric(12,2) not null default 0,
  image_url text,
  category_id uuid references public.categories(id) on delete set null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_products_active_created on public.products(active, created_at desc);
create index if not exists idx_products_category on public.products(category_id);

-- Banners (home carousel)
create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Online shops
create table if not exists public.online_shops (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  image_url text, -- logo
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_online_shops_active_order on public.online_shops(active, sort_order);

-- Settings (key/value per language)
create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  language text not null default 'id',
  value text not null,
  unique(key, language)
);

-- Company values (home/about sections)
create table if not exists public.company_values (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  language text not null default 'id',
  sort_order int not null default 0,
  active boolean not null default true
);
create index if not exists idx_company_values_lang_active on public.company_values(language, active, sort_order);

-- About sections
create table if not exists public.about (
  id uuid primary key default gen_random_uuid(),
  section text not null, -- description | vision | mission | etc
  language text not null default 'id',
  content text not null,
  unique(section, language)
);

-- About images
create table if not exists public.about_images (
  id uuid primary key default gen_random_uuid(),
  section text not null, -- story etc
  image_url text,
  alt_text text,
  sort_order int not null default 0,
  active boolean not null default true
);

-- Social links
create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null, -- Instagram, Facebook, etc
  url text not null,
  active boolean not null default true
);

-- Contact messages (form submissions)
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Helpful views (optional)
-- create or replace view public.active_products as
--   select p.*, c.name as category_name from public.products p
--   left join public.categories c on c.id = p.category_id
--   where p.active is true;


