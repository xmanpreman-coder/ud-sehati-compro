UD. SEHATI – Company Profile
================================

Tech stack
- Next.js 14 (App Router)
- TypeScript, SWR
- Supabase (Postgres + RLS)
- TailwindCSS, shadcn/ui

Prerequisites
- Node 18+
- Supabase project (or local supabase)

Environment variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

Install & run
```
pnpm i # or npm i / yarn
pnpm dev
```

Database setup
1) Open Supabase SQL editor and run these scripts in order:
   - `scripts/001_schema.sql`
   - `scripts/010_rls.sql`
   - `scripts/020_seed.sql` (optional demo data)

Data used by the app
- `settings` keys commonly referenced:
  - `company_name` (per language)
  - `company_logo` (favicon + header logo)
  - `whatsapp_number`
  - `contact_address`, `contact_phone`, `contact_email`
  - `google_maps_embed`

Key pages/components
- `app/page.tsx` – Home (banner, values, featured products)
- `app/products/page.tsx` – Catalog
- `app/online-shop/page.tsx` – All online shops
- `app/contact/page.tsx` – Contact page + form
- `components/product-modal.tsx` – Product details dialog
- `components/navbar.tsx` – Navbar with dynamic online shops dropdown

Favicon/logo
- Set `settings.key = company_logo` to a public image URL. The app injects this as favicon automatically.

Internationalization
- Basic language toggle via `hooks/use-language.ts` (id/en). Content is stored per-language.

Contact form flow
- Writes a row to `contact_messages` then opens WhatsApp to the company number from `settings.whatsapp_number`.

Scripts
- `scripts/001_schema.sql`: tables & indexes
- `scripts/010_rls.sql`: RLS policies (public read, anon insert contact messages)
- `scripts/020_seed.sql`: seed data

Troubleshooting
- Ensure RLS policies are applied; anonymous role must be allowed to SELECT for public pages
- Verify `.env.local` is correct and browser uses the same origin (no mixed origins)

# Company Profile Website

A modern, responsive company profile website built with Next.js, Supabase, and Tailwind CSS. Features multi-language support (Indonesian/English), dark/light mode, and a complete content management system.

## 🚀 Features

### Public Features
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Multi-language Support** - Indonesian and English language switching
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Dynamic Content** - All content managed through Supabase database
- **SEO Optimized** - Meta tags and structured data

### Pages
- **Homepage** - Hero banner carousel, company stats, featured products
- **About Us** - Company information, vision, mission, and team
- **Products** - Product catalog with filtering, search, and sorting
- **Online Shop** - Products grouped by marketplace (Shopee, Tokopedia, etc.)
- **Careers** - Job listings with application links
- **Contact** - Contact form with WhatsApp integration and Google Maps

### Admin Features
- **Simple Admin Panel** - Password-protected content management
- **Content Editing** - Manage banners, products, jobs, and settings
- **Multi-language Content** - Edit content in both languages

## 🛠 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

## 📋 Prerequisites

- Node.js 18+ 
- Supabase account
- Vercel account (for deployment)

## 🚀 Quick Start

### 1. Environment Variables

Add these environment variables to your Vercel project:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### 2. Database Setup

Run the SQL scripts in order:

1. **Create Tables**: `scripts/001_create_tables.sql`
2. **Seed Data**: `scripts/002_seed_data.sql`
3. **Admin Policies**: `scripts/003_admin_policies.sql`

### 3. Deploy

Click the **Publish** button in v0 to deploy to Vercel, or:

\`\`\`bash
# Clone the project
git clone <your-repo-url>
cd company-profile

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

## 📊 Database Schema

### Core Tables

- **`settings`** - Site configuration and multi-language content
- **`banners`** - Homepage carousel banners
- **`products`** - Product catalog with categories
- **`product_categories`** - Product categorization
- **`jobs`** - Career listings
- **`social_media`** - Social media links
- **`contact_info`** - Contact information
- **`contact_submissions`** - Contact form submissions
- **`admin_users`** - Simple admin authentication

### Key Features

- **Row Level Security (RLS)** enabled on all tables
- **Public read access** for content tables
- **Admin-only write access** for content management
- **Multi-language support** with `content_id` and `content_en` fields

## 🔐 Admin Access

- **URL**: `/admin`
- **Password**: `admin123`

### Admin Features

- View and manage all content
- Edit multi-language content
- Manage products, banners, and job listings
- View contact form submissions

## 🌐 Multi-language Support

The website supports Indonesian (default) and English:

- **Language Switcher** - Available in the navigation
- **Database Content** - Separate fields for each language
- **URL Structure** - No URL changes, content switches dynamically
- **Fallback System** - Falls back to Indonesian if English content is missing

## 🎨 Customization

### Colors & Theming

The website uses a professional color scheme:
- **Primary**: Dark gray/black tones
- **Accent**: Blue highlights
- **Background**: White/dark mode variants

Customize colors in `app/globals.css` using CSS custom properties.

### Content Management

All content is stored in Supabase and can be edited through:
1. **Admin Panel** - User-friendly interface at `/admin`
2. **Direct Database** - Supabase dashboard for advanced users

### Adding New Features

The codebase is modular and extensible:
- **Components** - Reusable UI components in `/components`
- **Hooks** - Custom React hooks in `/hooks`
- **Types** - TypeScript definitions in `/lib/types.ts`
- **Database** - Add new tables and update types accordingly

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Touch Friendly** - Large tap targets and smooth interactions

## 🔍 SEO Features

- **Meta Tags** - Dynamic titles and descriptions
- **Open Graph** - Social media sharing optimization
- **Structured Data** - Schema.org markup for better search results
- **Sitemap** - Automatic sitemap generation
- **Performance** - Optimized images and lazy loading

## 🚀 Performance

- **Server Components** - Reduced client-side JavaScript
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic route-based splitting
- **Caching** - Supabase query caching with SWR
- **Analytics** - Vercel Analytics for performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- **Documentation**: This README
- **Issues**: GitHub Issues
- **Contact**: Through the website contact form

---

Built with ❤️ using [v0.app](https://v0.app)
