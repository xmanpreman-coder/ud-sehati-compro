Deployment Guide
================

Vercel (recommended)
1. Push this repository to GitHub/GitLab/Bitbucket
2. In Vercel, create a new project from the repo
3. Set Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Build settings: framework = Next.js; build command = `next build` (default)
5. Click Deploy

Supabase configuration
- Run the SQL scripts in this order:
  - `scripts/001_schema.sql`
  - `scripts/010_rls.sql`
  - `scripts/020_seed.sql` (optional)
- Insert your real data into `settings` (logo, name, whatsapp number, contact info)

Static assets
- If using local images for `company_logo` or shops, host them on a public URL (e.g., Supabase Storage) and use that URL in `settings`.

Alternative hosting (Node server)
1. Build: `pnpm build` (or `npm run build`)
2. Start: `pnpm start` (serves `.next/standalone`)
3. Ensure the same environment variables are present on the host

Custom domains
- Configure domain on Vercel settings. Add CNAME/ANAME as instructed by Vercel.

Cache & favicon
- After changing `company_logo` in settings, hard refresh (Ctrl+F5). Browsers cache favicons aggressively.

Security
- RLS policies restrict writes; only `contact_messages` allows anonymous inserts. Use Supabase service key (server) when you need privileged writes.


