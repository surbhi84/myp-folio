<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Pfolio — Developer Quick Reference

## Project Overview
Personal portfolio site for Surbhi Kukreti (Frontend Developer). Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, and Resend for contact form emails.

## Commands
| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Production start | `npm run start` |
| Lint | `npm run lint` |

Run lint before committing. No test suite exists.

## Architecture
- **App Router** (`app/`): `page.tsx` composes section components; `layout.tsx` loads fonts + global styles + `NoiseOverlay`
- **Components** (`components/`):
  - `navigation/` — `FloatingHeader` (scroll-aware capsule nav)
  - `sections/` — One component per page section (Hero, About, Manifesto, Projects, Services, Contact)
  - `ui/` — Reusable primitives (`NoiseOverlay`, `PillButton`, `Badge3D`, `ScrollCard3D`, icons)
- **Data** (`content/portfolio-data.ts`): Single source of truth for all content (personal info, projects, services, experience). Edit here to update copy.
- **Utils** (`lib/utils.ts`): `cn()` helper merging `clsx` + `tailwind-merge`.

## Key Conventions
- **Path alias**: `@/*` maps to project root (configured in `tsconfig.json`)
- **Fonts**: Four Google Fonts via `next/font` — Archivo (headings), Plus Jakarta Sans (UI), Inter (body), Geist Mono (code). Variables injected in `layout.tsx`.
- **Styling**: Tailwind v4 with CSS-first config (`@import "tailwindcss"` in `globals.css`). Custom theme colors in `:root` + `@theme inline`.
- **Images**: Only `images.unsplash.com` allowed via `next.config.ts` remotePatterns.
- **Contact API** (`app/api/contact/route.ts`): Requires `RESEND_API_KEY` env var. Optional: `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.

## Environment Variables
Create `.env.local` for local development:
```
RESEND_API_KEY=re_xxx              # Required for contact form
CONTACT_TO_EMAIL=your@email.com    # Default: subuhikukreti@gmail.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

## Common Tasks

### Update Portfolio Content
Edit `content/portfolio-data.ts` — all text, projects, services, experience, navigation links live here. Components consume this data directly.

### Add a Project
Add a new object to `PORTFOLIO_DATA.projects` array. Required fields: `id`, `title`, `category`, `description`, `gradient`, `textColor`, `tags`, `liveUrl`, `mockupType` ("agency" | "ai-app" | "saas" | "dashboard"). Optional: `githubUrl`, `metrics`.

### Modify Contact Form
- Frontend: `components/sections/contact-section.tsx`
- Backend: `app/api/contact/route.ts` (validation, Resend payload)

### Add a Section
1. Create component in `components/sections/`
2. Import and add to `app/page.tsx` in desired order
3. Add navigation link to `PORTFOLIO_DATA.navigation` if needed

## Gotchas
- **Tailwind v4**: No `tailwind.config.js`. Config lives in `globals.css` via `@theme inline`.
- **No test runner**: Lint is the only CI gate.
- **Node 20+** required (per `package.json` engines implied by Next 16).
- **Framer Motion**: Used heavily for scroll/entrance animations — check `components/sections/*.tsx` for patterns.
- **Resend**: Free tier uses `onboarding@resend.dev` as sender; verified domain needed for custom `from` address.

## File Map (High-Value)
```
app/
  page.tsx          # Main page composition
  layout.tsx        # Fonts, metadata, NoiseOverlay
  globals.css       # Tailwind v4 import + theme tokens
  api/contact/route.ts  # Resend email handler
components/
  sections/         # Page sections (Hero, About, Projects, etc.)
  navigation/       # FloatingHeader
  ui/               # Reusable primitives
content/
  portfolio-data.ts # ALL content — single source of truth
lib/
  utils.ts          # cn() helper
```