# DevBooks

A modern, fully dynamic programming-book library and store, built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS** and **MySQL**. Every visible piece of content — text, image, banner, testimonial, team member — is editable from the bundled admin panel without touching code.

## Highlights

- **Public site:** home, books library, categories, free resources, about, contact, cart, login, register, privacy, terms — all server-rendered, all driven by MySQL.
- **Admin panel** (`/admin`) with HMAC-signed session auth and full CRUD for:
  - Categories, books, banners, testimonials, team members, resources, media
  - Per-page content editors (199 settings rows covering every label and string on the public site)
  - A 13-type section builder so you can add, reorder, hide, edit or delete any section on the home and about pages
- **Mobile-responsive** across the entire public site and admin panel.
- **Curated, animated UI** — Framer Motion, custom Times-New-Roman display type, parallax hero, count-up stats, animated testimonials.

## Tech stack

| Layer       | Choice |
|-------------|--------|
| Framework   | Next.js 14.2 (App Router, Server Components + Server Actions) |
| Language    | TypeScript |
| Styling     | Tailwind CSS, custom palette (cream / emerald / gold / ink) |
| Database    | MySQL via `mysql2/promise` connection pool (utf8mb4) |
| Auth        | HMAC-signed cookie sessions, edge-runtime middleware guard on `/admin/:path*` |
| Animations  | Framer Motion |
| Icons       | lucide-react |

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/JidnyasaGirase4/Devbooks.git
cd Devbooks
npm install
```

### 2. Database

Spin up MySQL (XAMPP, MAMP, Docker, or any cloud MySQL).

Run the SQL files in this order — paste each into phpMyAdmin's SQL tab on the `codebooks` database, or pipe through the `mysql` CLI:

```
sql/schema.sql      # creates the codebooks database
sql/books.sql       # categories + books
sql/cms.sql         # settings + banners + media
sql/cms2.sql        # testimonials + team_members + resources
sql/cms3.sql        # adds 70+ extra settings (cart / login / register / privacy / terms / navbar)
sql/sections.sql    # page_sections builder table + seed rows
sql/fix-emojis.sql  # only if your category emojis show as ?
```

### 3. Environment

Copy `.env.local.example` → `.env.local` and fill in:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=codebooks

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
SESSION_SECRET=change-me-to-a-long-random-string
```

### 4. Run

```bash
npm run dev
```

Public site: http://localhost:3000
Admin panel: http://localhost:3000/admin (default `admin` / `admin123`)

## Project structure

```
app/
  (public pages)       home, books, categories, free-resources, about, contact, cart, login, register, privacy-policy, terms
  admin/               dashboard + CRUD for every entity + per-page editors + section builder
components/
  *Client.tsx          rich client components for each public page
  admin/               admin forms, tables, shells, delete-confirm buttons
lib/
  db.js                mysql2 pool (utf8mb4)
  queries.ts           25+ typed read functions
  actions.ts           server actions for every mutation, with FK-error handling
  auth.ts              HMAC session helpers
  sections.ts          section-type catalog + defaults
sql/                   schema + seed data + emoji repair
```

## Deployment

The Next.js app deploys cleanly to Vercel or Netlify. **You will need a publicly reachable MySQL** — local XAMPP won't work from a deployed environment. Options:

- [PlanetScale](https://planetscale.com) (MySQL-compatible, free tier)
- [Railway](https://railway.app) (one-click MySQL)
- [Aiven](https://aiven.io) (free MySQL trial)
- Any VPS with public MySQL

Update `.env.local` (or your host's environment variables) to point at the cloud DB.

## License

MIT — do whatever you like, just keep the notice.
