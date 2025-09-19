-- Supabase SQL – RLS policies

-- Enable RLS
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.banners enable row level security;
alter table public.online_shops enable row level security;
alter table public.settings enable row level security;
alter table public.company_values enable row level security;
alter table public.about enable row level security;
alter table public.about_images enable row level security;
alter table public.social_links enable row level security;
alter table public.contact_messages enable row level security;

-- Public read for content tables
create policy if not exists "Public can read categories" on public.categories
for select using (true);

create policy if not exists "Public can read products" on public.products
for select using (true);

create policy if not exists "Public can read banners" on public.banners
for select using (true);

create policy if not exists "Public can read online shops" on public.online_shops
for select using (true);

create policy if not exists "Public can read settings" on public.settings
for select using (true);

create policy if not exists "Public can read company values" on public.company_values
for select using (true);

create policy if not exists "Public can read about" on public.about
for select using (true);

create policy if not exists "Public can read about images" on public.about_images
for select using (true);

create policy if not exists "Public can read social links" on public.social_links
for select using (true);

-- Allow anonymous inserts for contact messages (form submissions)
create policy if not exists "Anon can insert contact messages" on public.contact_messages
for insert with check (true);


