-- Minimal seed data

insert into public.settings(key, language, value) values
  ('company_name','id','UD. SEHATI')
on conflict (key, language) do update set value = excluded.value;

insert into public.settings(key, language, value) values
  ('company_logo','id','/logo.png')
on conflict (key, language) do update set value = excluded.value;

insert into public.settings(key, language, value) values
  ('whatsapp_number','id','6281234567890')
on conflict (key, language) do update set value = excluded.value;

insert into public.company_values(title, description, icon, language, sort_order, active)
values
 ('Kualitas Terbaik','Komitmen pada produk unggulan dengan bahan baku lokal.','award','id',1,true),
 ('Kemitraan Berkelanjutan','Hubungan adil dan berkelanjutan.','handshake','id',2,true),
 ('Inovasi Tradisional','Kearifan lokal dengan inovasi.','lightbulb','id',3,true),
 ('Pengalaman Pelanggan','Pengalaman terbaik yang berkesan.','heart','id',4,true)
on conflict do nothing;

insert into public.online_shops(name, url, image_url, sort_order, active)
values
 ('Tokopedia','https://tokopedia.com/','/shops/tokopedia.png',1,true),
 ('Shopee','https://shopee.co.id/','/shops/shopee.png',2,true)
on conflict do nothing;

insert into public.categories(name, slug, active) values
 ('Saus','saus',true)
on conflict do nothing;

-- One demo product
insert into public.products(name, slug, description, price, image_url, active)
values('Kecap Kedelai','kecap-kedelai','Kecap manis premium.','18500','/placeholder.svg?height=600&width=600',true)
on conflict do nothing;

insert into public.banners(title, subtitle, image_url, active)
values('Layanan Profesional','Tim ahli siap membantu Anda 24/7','/placeholder.svg?height=600&width=1200',true)
on conflict do nothing;

insert into public.social_links(platform, url, active) values
 ('Instagram','https://instagram.com/',true),
 ('Facebook','https://facebook.com/',true)
on conflict do nothing;

