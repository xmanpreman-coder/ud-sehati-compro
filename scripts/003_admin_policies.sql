-- Create admin policies for content management
-- Note: In a real application, you would want proper authentication
-- For now, we'll create policies that allow updates for demonstration

-- Allow updates to settings
CREATE POLICY "Allow settings update" ON settings FOR UPDATE USING (true);
CREATE POLICY "Allow settings insert" ON settings FOR INSERT WITH CHECK (true);

-- Allow updates to banners
CREATE POLICY "Allow banners update" ON banners FOR UPDATE USING (true);
CREATE POLICY "Allow banners insert" ON banners FOR INSERT WITH CHECK (true);

-- Allow updates to about content
CREATE POLICY "Allow about update" ON about FOR UPDATE USING (true);
CREATE POLICY "Allow about insert" ON about FOR INSERT WITH CHECK (true);

-- Allow updates to products
CREATE POLICY "Allow products update" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow products insert" ON products FOR INSERT WITH CHECK (true);

-- Allow updates to categories
CREATE POLICY "Allow categories update" ON categories FOR UPDATE USING (true);
CREATE POLICY "Allow categories insert" ON categories FOR INSERT WITH CHECK (true);

-- Allow updates to jobs
CREATE POLICY "Allow jobs update" ON jobs FOR UPDATE USING (true);
CREATE POLICY "Allow jobs insert" ON jobs FOR INSERT WITH CHECK (true);

-- Allow updates to social links
CREATE POLICY "Allow social_links update" ON social_links FOR UPDATE USING (true);
CREATE POLICY "Allow social_links insert" ON social_links FOR INSERT WITH CHECK (true);

-- Allow updates to online shops
CREATE POLICY "Allow online_shops update" ON online_shops FOR UPDATE USING (true);
CREATE POLICY "Allow online_shops insert" ON online_shops FOR INSERT WITH CHECK (true);

-- Allow reading contact messages for admin
CREATE POLICY "Allow contact_messages read" ON contact_messages FOR SELECT USING (true);
