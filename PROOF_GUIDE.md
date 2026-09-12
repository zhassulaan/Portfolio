# Proof: one source of truth

All certificate and recommendation content lives in `data/portfolio.ts` inside
the exported `proof_documents` array.

The `/proof` archive and the individual `/certificate/[slug]` and
`/recommendation/[slug]` pages all read from this same array. Do **not**
create a second list.

Routes are derived from each entry automatically:

- `kind: 'certificate'` → `/certificate/<slug>`
- `kind: 'recommendation'` → `/recommendation/<slug>`

For example, the KeyHorse recommendation letter (`slug: 'keyhorse'`,
`kind: 'recommendation'`) is reachable at `/recommendation/keyhorse`.

## Add a new certificate or recommendation

1. Add the scanned file to `public/files/certificates/` or
   `public/files/recommendations/`, for example
   `public/files/certificates/my_certificate.pdf`. Files under `public/` are
   served as-is at the same path, so this file is reachable at
   `/files/certificates/my_certificate.pdf` — no import needed (this avoids
   any bundler asset-type configuration for PDFs).
2. Add one object to `proof_documents` in `data/portfolio.ts`:

```ts
{
  slug: 'my-certificate',
  kind: 'certificate',
  title: 'My Certificate',
  issuer: 'Issuing organization',
  date: '2026',
  description: 'One or two sentences on what this document proves.',
  file: '/files/certificates/my_certificate.pdf',
  file_type: 'pdf', // or 'image' for a .png/.jpg scan
},
```

That is enough. The entry automatically appears in the `/proof` archive
(search + type filter) and its detail page renders the embedded file with an
"Open full document" link.

## No file yet?

Leave `file` unset. The detail page shows a clear placeholder ("Scan not
uploaded yet") instead of a broken embed, so it's safe to publish an entry
before the real document is ready and attach the file later.

## Current entries

- `keyhorse` (recommendation) already has its real signed letter attached at
  `public/files/recommendations/keyhorse.pdf` (recovered from a previous
  production build). Its letter states a KeyHorse tenure of June 2022 –
  August 2026 as "Web Developer" — this doesn't match the CV/site's KeyHorse
  dates (2021–2025, Team Lead → Senior Software Engineer). Worth resolving
  before this page goes out to recruiters: either ask KeyHorse for an updated
  letter, or adjust the surrounding copy.
- `ielts`, `chinese-proficiency` and `infomatrix-silver-medal` (certificates)
  are seeded with real titles/dates but no `file` yet — attach the actual
  scans following the steps above whenever they're ready. Double-check the
  `issuer` field for `chinese-proficiency` in particular; it was left generic
  since the exact certifying body wasn't specified.

Two more real, signed reference letters turned up in the same recovered build
but aren't wired in because the employers they're from (Athena Plus, 2022;
KasChim, a 2021 university internship reference) aren't part of the current
CV/site narrative: `recommendation_letter-athena_plus...pdf` and
`refference_letter-kashim...pdf` inside the old `.output/public/_nuxt/`
folder. Add them as new `proof_documents` entries (same steps above) if you
want them included.
