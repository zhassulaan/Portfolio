# Zhassulan Serikuly — Engineering Notebook

A Nuxt 3 portfolio deliberately designed **not** to duplicate LinkedIn.

LinkedIn carries chronology and job-description detail. This site focuses on:

- measurable engineering decisions;
- frontend architecture and modernization;
- performance work at product and GIS scale;
- system types and operating principles;
- a compressed career path with company logos;
- verifiable proof such as education, IELTS, competition recognition and recommendation letters.

## Source conventions

- Vue 3 + Nuxt 3 + TypeScript;
- component-based architecture;
- `snake_case` filenames;
- BEM-style CSS with `snake_case` blocks/elements;
- component-owned styles under `assets/css/components/`;
- `;` for TypeScript statements and trailing `,` in data structures;
- lightweight IntersectionObserver reveal animation with reduced-motion support.

## Run

```bash
npm install
npm run dev
```

## Everyday commands

| Command | What it does |
| --- | --- |
| `npm run lint:all` | ESLint, Stylelint, HTML validation, language files |
| `npm run test:unit` | Vitest unit tests |
| `npm run test:e2e` | Builds the site and runs Playwright |
| `npm run i18n:add -- <code> "<name>"` | Scaffolds a new language |
| `npm run lint:i18n` | Language coverage and consistency report |
| `npm run sitemap` | Regenerates `public/sitemap.xml` |

## Configuration

Copy `.env.example` to `.env`. Everything is optional:

- `NUXT_PUBLIC_BOOKING_URL` — Cal.com/Calendly link for “Book an intro call”
  (without it the button opens a pre-filled email).
- `NUXT_PUBLIC_ANALYTICS_DOMAIN` — turns on cookie-free Plausible analytics.
  Custom events: CV Download, CV Open, Booking Click, Email Click, Email Copy.
- `NUXT_PUBLIC_SITE_URL` — canonical/hreflang/Open Graph base URL.

## More guides

- `guide/LANGUAGES_GUIDE.md` — adding languages
- `guide/BLOG_GUIDE.md` — writing posts
- `guide/COMPONENT_STRUCTURE.md`, `PROJECTS_GUIDE.md`, `PROOF_GUIDE.md`

## CV file

The CV button serves `public/files/Zhassulan-Serikuly-CV.pdf` (also reachable
at the stable address `/cv.pdf`). To update it, replace that file — a unit
test checks that it exists and is a real PDF.
