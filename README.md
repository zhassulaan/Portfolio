# Portfolio

My personal portfolio: https://zhassulan.netlify.app

Built with Nuxt 3, Vue 3 and TypeScript. It has 7 languages, light and dark themes and an accessibility panel.

Pages: home (cases, projects, career path, hire me), `/projects`, `/cv`, `/proof`, `/blog`.

## Code conventions

- `snake_case` for files, variables and CSS class names.
- BEM-style CSS. Each component keeps its `.vue` and `.css` files in one folder.
- `;` after TypeScript statements, trailing `,` in data.
- Details in `guide/COMPONENT_STRUCTURE.md`.

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
| `npm run feeds` | Regenerates `public/sitemap.xml` and `public/rss.xml` |
| `npm run lighthouse` | Lighthouse scores for the main pages (needs a running site) |
| `npm run check:site` | Checks that the live site and the CV PDF respond |

## Configuration

Copy `.env.example` to `.env`. Everything is optional:

- `NUXT_PUBLIC_BOOKING_URL` is the Calendly or Cal.com link for “Book an intro call”.
  Without it, the button opens an email.
- `NUXT_PUBLIC_ANALYTICS_DOMAIN` turns on Plausible analytics.
  Events: CV Download, CV Open, Booking Click, Email Click, Email Copy.
- `NUXT_PUBLIC_SITE_URL` is the base URL for canonical, hreflang and Open Graph links.

## More guides

- `guide/LANGUAGES_GUIDE.md`: adding languages
- `guide/BLOG_GUIDE.md`: writing posts
- `guide/COMPONENT_STRUCTURE.md`, `PROJECTS_GUIDE.md`, `PROOF_GUIDE.md`

## CV file

The CV button serves `public/files/Zhassulan-Serikuly-CV.pdf`, also available at
`/cv.pdf`. To update the CV, replace that file. A unit test checks that it
exists and is a PDF.

## Checks that run on GitHub

- **CI**: linters, unit tests, build and e2e (including accessibility with axe).
- **Lighthouse**: fails below performance 90, accessibility 100, best practices 95
  or SEO 95 (median of 3 runs).
- **Uptime check**: every 30 minutes it requests the live site and the CV PDF.
  A failed run sends you an email. For an independent second alert you can add
  the site to UptimeRobot (free): New monitor, HTTP(s), your URL, 5 minutes.
