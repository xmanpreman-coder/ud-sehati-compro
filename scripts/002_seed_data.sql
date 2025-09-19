-- Insert default settings
INSERT INTO settings (key, value, language) VALUES
  ('company_name', 'UD. SEHATI', 'id'),
  ('company_name', 'UD. SEHATI', 'en'),
  ('company_logo', '/placeholder.svg?height=40&width=120', 'id'),
  ('company_logo', '/placeholder.svg?height=40&width=120', 'en'),
  ('navbar_title', 'Perusahaan Kami', 'id'),
  ('navbar_title', 'Our Company', 'en'),
  ('footer_text', '© 2024 UD. SEHATI. Semua hak dilindungi.', 'id'),
  ('footer_text', '© 2024 UD. SEHATI. All rights reserved.', 'en'),
  ('contact_address', 'Jl. Contoh No. 123, Jakarta, Indonesia', 'id'),
  ('contact_address', '123 Example Street, Jakarta, Indonesia', 'en'),
  ('contact_email', 'info@contohperusahaan.com', 'id'),
  ('contact_email', 'info@examplecompany.com', 'en'),
  ('contact_phone', '+62 21 1234 5678', 'id'),
  ('contact_phone', '+62 21 1234 5678', 'en'),
  ('whatsapp_number', '+6281234567890', 'id'),
  ('whatsapp_number', '+6281234567890', 'en'),
  ('google_maps_embed', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.2087634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sMonas!5e0!3m2!1sen!2sid!4v1635724123456!5m2!1sen!2sid', 'id'),
  ('google_maps_embed', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.2087634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sMonas!5e0!3m2!1sen!2sid!4v1635724123456!5m2!1sen!2sid', 'en')
ON CONFLICT (key, language) DO NOTHING;

-- Insert sample banners
INSERT INTO banners (title, subtitle, image_url, active) VALUES
  ('Selamat Datang di Perusahaan Kami', 'Solusi terbaik untuk kebutuhan bisnis Anda', '/placeholder.svg?height=400&width=800', true),
  ('Produk Berkualitas Tinggi', 'Dipercaya oleh ribuan pelanggan di seluruh Indonesia', '/placeholder.svg?height=400&width=800', true),
  ('Layanan Profesional', 'Tim ahli siap membantu Anda 24/7', '/placeholder.svg?height=400&width=800', true);

-- Insert about content
INSERT INTO about (section, language, content) VALUES
  ('description', 'id', 'UD. SEHATI lahir dari sebuah mimpi sederhana: untuk memperkenalkan kembali kekayaan cita rasa dan kerajinan tangan Indonesia yang otentik kepada masyarakat luas. Berawal dari dapur rumahan di Surabaya pada tahun 2010, kami memulai perjalanan dengan resep-resep warisan keluarga yang diolah menggunakan bahan-bahan segar langsung dari petani lokal. Kami percaya bahwa setiap produk memiliki cerita, dan di balik setiap gigitan atau sentuhan produk UD. SEHATI, ada kisah tentang kerja keras, dedikasi, dan semangat komunitas yang kami dukung. Semangat "Sehati" menjadi landasan kami untuk tumbuh bersama, seirama dengan alam dan para mitra kami.'),
  ('description', 'en', 'UD. SEHATI was born from a simple dream: to reintroduce the authentic flavors and craftsmanship of Indonesia to the wider community. Starting from a home kitchen in Surabaya in 2010, we began our journey with family heritage recipes using fresh ingredients directly from local farmers. We believe that every product has a story, and behind every bite or touch of UD. SEHATI products, there is a story about hard work, dedication, and the community spirit we support. The "Sehati" spirit becomes our foundation to grow together, in harmony with nature and our partners.'),
  ('vision', 'id', 'Menjadi pelopor produk UMKM Indonesia yang dikenal secara global karena kualitas, otentisitas, dan komitmennya terhadap pemberdayaan komunitas lokal.'),
  ('vision', 'en', 'To become a pioneer of Indonesian MSME products known globally for their quality, authenticity, and commitment to local community empowerment.'),
  ('mission', 'id', 'Menghasilkan produk berkualitas tinggi dengan bahan baku lokal terbaik. Membangun kemitraan yang adil dan berkelanjutan dengan petani dan pengrajin. Melestarikan resep dan teknik tradisional dengan sentuhan inovasi modern. Memberikan pengalaman pelanggan yang tak terlupakan.'),
  ('mission', 'en', 'Producing high-quality products with the best local raw materials. Building fair and sustainable partnerships with farmers and craftsmen. Preserving traditional recipes and techniques with modern innovation touches. Providing unforgettable customer experiences.');

-- Insert sample categories
INSERT INTO categories (name, slug) VALUES
  ('Elektronik', 'elektronik'),
  ('Perangkat Lunak', 'perangkat-lunak'),
  ('Konsultasi', 'konsultasi'),
  ('Pelatihan', 'pelatihan');

-- Insert sample products
INSERT INTO products (name, description, price, category_id, image_url, whatsapp_link) VALUES
  ('Sistem Manajemen Inventori', 'Solusi lengkap untuk mengelola inventori bisnis Anda dengan fitur real-time tracking dan reporting.', 5000000.00, (SELECT id FROM categories WHERE slug = 'perangkat-lunak'), '/placeholder.svg?height=300&width=300', 'https://wa.me/6281234567890?text=Saya tertarik dengan Sistem Manajemen Inventori'),
  ('Konsultasi IT', 'Layanan konsultasi teknologi informasi untuk optimalisasi sistem bisnis Anda.', 2500000.00, (SELECT id FROM categories WHERE slug = 'konsultasi'), '/placeholder.svg?height=300&width=300', 'https://wa.me/6281234567890?text=Saya tertarik dengan layanan Konsultasi IT'),
  ('Pelatihan Digital Marketing', 'Program pelatihan komprehensif untuk meningkatkan kemampuan digital marketing tim Anda.', 1500000.00, (SELECT id FROM categories WHERE slug = 'pelatihan'), '/placeholder.svg?height=300&width=300', 'https://wa.me/6281234567890?text=Saya tertarik dengan Pelatihan Digital Marketing'),
  ('Smart POS System', 'Sistem point of sale pintar dengan fitur analitik dan integrasi payment gateway.', 3500000.00, (SELECT id FROM categories WHERE slug = 'elektronik'), '/placeholder.svg?height=300&width=300', 'https://wa.me/6281234567890?text=Saya tertarik dengan Smart POS System'),
  ('Website Development', 'Jasa pembuatan website profesional dengan desain modern dan responsif.', 4000000.00, (SELECT id FROM categories WHERE slug = 'perangkat-lunak'), '/placeholder.svg?height=300&width=300', 'https://wa.me/6281234567890?text=Saya tertarik dengan jasa Website Development'),
  ('Mobile App Development', 'Pengembangan aplikasi mobile untuk iOS dan Android dengan fitur lengkap.', 8000000.00, (SELECT id FROM categories WHERE slug = 'perangkat-lunak'), '/placeholder.svg?height=300&width=300', 'https://wa.me/6281234567890?text=Saya tertarik dengan Mobile App Development');

-- Insert online shop links
INSERT INTO online_shops (name, url, icon, active, sort_order) VALUES
  ('Tokopedia', 'https://tokopedia.com/ud-sehati', 'shopping-cart', true, 1),
  ('Shopee', 'https://shopee.co.id/ud-sehati', 'shopping-cart', true, 2),
  ('Bukalapak', 'https://bukalapak.com/ud-sehati', 'shopping-cart', true, 3),
  ('Lazada', 'https://lazada.co.id/ud-sehati', 'shopping-cart', true, 4),
  ('Blibli', 'https://blibli.com/ud-sehati', 'shopping-cart', true, 5);

-- Insert sample jobs
INSERT INTO jobs (title, description, location, apply_link) VALUES
  ('Frontend Developer', 'Kami mencari Frontend Developer berpengalaman dengan keahlian React, TypeScript, dan Tailwind CSS. Bergabunglah dengan tim kami untuk mengembangkan aplikasi web modern.', 'Jakarta, Indonesia', 'https://forms.google.com/frontend-developer'),
  ('Backend Developer', 'Posisi Backend Developer untuk mengembangkan API dan sistem backend menggunakan Node.js, PostgreSQL, dan cloud technologies.', 'Jakarta, Indonesia (Remote Available)', 'https://forms.google.com/backend-developer'),
  ('UI/UX Designer', 'Desainer UI/UX kreatif untuk merancang pengalaman pengguna yang luar biasa. Pengalaman dengan Figma dan design thinking diperlukan.', 'Jakarta, Indonesia', 'https://forms.google.com/ui-ux-designer'),
  ('Digital Marketing Specialist', 'Spesialis pemasaran digital untuk mengelola kampanye online, SEO, dan social media marketing.', 'Jakarta, Indonesia', 'https://forms.google.com/digital-marketing');

-- Insert company values
INSERT INTO company_values (title, description, icon, language, sort_order, active) VALUES
  ('Kualitas Terbaik', 'Kami berkomitmen untuk menghasilkan produk berkualitas tinggi dengan bahan baku lokal terbaik.', 'award', 'id', 1, true),
  ('Kemitraan Berkelanjutan', 'Membangun kemitraan yang adil dan berkelanjutan dengan petani dan pengrajin lokal.', 'handshake', 'id', 2, true),
  ('Inovasi Tradisional', 'Melestarikan resep dan teknik tradisional dengan sentuhan inovasi modern.', 'lightbulb', 'id', 3, true),
  ('Pengalaman Pelanggan', 'Memberikan pengalaman pelanggan yang tak terlupakan dalam setiap interaksi.', 'heart', 'id', 4, true),
  ('Best Quality', 'We are committed to producing high-quality products with the best local raw materials.', 'award', 'en', 1, true),
  ('Sustainable Partnership', 'Building fair and sustainable partnerships with local farmers and craftsmen.', 'handshake', 'en', 2, true),
  ('Traditional Innovation', 'Preserving traditional recipes and techniques with modern innovation touches.', 'lightbulb', 'en', 3, true),
  ('Customer Experience', 'Providing unforgettable customer experiences in every interaction.', 'heart', 'en', 4, true);

-- Insert about images
INSERT INTO about_images (image_url, alt_text, caption, section, sort_order, active) VALUES
  ('/placeholder.jpg', 'Dapur UD. SEHATI', 'Dapur modern UD. SEHATI dengan peralatan berkualitas tinggi', 'story', 1, true),
  ('/placeholder.jpg', 'Tim UD. SEHATI', 'Tim profesional UD. SEHATI yang berdedikasi', 'story', 2, true),
  ('/placeholder.jpg', 'Produk UD. SEHATI', 'Berbagai produk berkualitas dari UD. SEHATI', 'vision', 1, true),
  ('/placeholder.jpg', 'Komunitas Petani', 'Kemitraan dengan petani lokal', 'mission', 1, true);

-- Insert social media links
INSERT INTO social_links (platform, url, icon) VALUES
  ('Instagram', 'https://instagram.com/contohperusahaan', 'instagram'),
  ('Facebook', 'https://facebook.com/contohperusahaan', 'facebook'),
  ('TikTok', 'https://tiktok.com/@contohperusahaan', 'tiktok'),
  ('YouTube', 'https://youtube.com/contohperusahaan', 'youtube'),
  ('LinkedIn', 'https://linkedin.com/company/contohperusahaan', 'linkedin');
