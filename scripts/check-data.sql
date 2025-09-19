-- Check if company_values table exists and has data
SELECT COUNT(*) as total_values FROM company_values;

-- Check values for Indonesian
SELECT * FROM company_values WHERE language = 'id' AND active = true ORDER BY sort_order;

-- Check values for English  
SELECT * FROM company_values WHERE language = 'en' AND active = true ORDER BY sort_order;

-- Check online_shops data
SELECT COUNT(*) as total_shops FROM online_shops WHERE active = true;

-- Check about data
SELECT section, language, content FROM about ORDER BY section, language;
