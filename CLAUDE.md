# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Saly Tourisme** — Next.js 14 MVP for a Senegalese beach tourism agency based in Saly Portudal. Tourism website with hotel listings, activities, packages, and booking contact.

## Commands

```bash
npm run dev       # Start dev server on http://localhost:3000
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint
```

## Tech Stack

- **Next.js 14** — App Router, TypeScript
- **Tailwind CSS** — Custom design tokens in `tailwind.config.ts`
- **Framer Motion** — All animations (parallax, card hover, scroll reveals)
- **Lucide React** — Icons

## Architecture

```
app/
  layout.tsx          # Root layout: imports Navbar, Footer, WhatsAppButton
  page.tsx            # Homepage (Hero + sections, all "use client")
  hebergements/       # Hotel listing with filters
  activites/          # Activities listing with filters
  forfaits/           # Package deals
  contact/            # Contact form + map

components/
  Navbar.tsx          # Sticky, glass effect on scroll, language switcher
  Footer.tsx          # Newsletter form (must be "use client" — has onSubmit)
  WhatsAppButton.tsx  # Fixed floating button with pulse animation
  SearchBar.tsx       # LeBonCoin-style multi-field search
  HotelCard.tsx       # Hotel card with Framer Motion hover
  ActivityCard.tsx    # Activity card
  PackageCard.tsx     # Package card with featured badge
  StarRating.tsx      # Reusable star display

lib/
  data.ts             # All mock data: hotels, activities, packages, testimonials
```

## Design Tokens

All brand colors, fonts, and animations are defined in [tailwind.config.ts](tailwind.config.ts):

- `ocean-*` — Primary (#1E6B9C)
- `sand-*` — Secondary (#E8B96F)
- `tropical-*` — Accent (#2E8B57)
- `font-playfair` — Playfair Display (titles)
- `font-opensans` — Open Sans (body)

## Key Patterns

- All interactive pages (`useState`, `framer-motion`) use `"use client"` directive
- Server Components (layout, static sections) must NOT have event handlers
- Images from Unsplash/pravatar allowed via `next.config.mjs` `remotePatterns`
- Mock data in `lib/data.ts` — add new entries there to populate listings
