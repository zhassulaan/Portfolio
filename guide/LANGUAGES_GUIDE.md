# Adding and maintaining languages

A language is three small pieces, all created by one command.

| Piece | File | Required |
| --- | --- | --- |
| Registry entry | `config/locales.json` | yes |
| UI strings (buttons, headings) | `locales/<code>.json` | yes (may start as `{}`) |
| Content overlay (project/case-study text) | `data/translations/<code>.ts` | no |

Anything missing falls back to English, key by key, so a language can ship
half-translated and be completed over time.

## Add a language

```bash
npm run i18n:add -- fr "Français" fr-FR
```

- Creates the two files and registers the language as `"published": false`
  (hidden from the switcher, the sitemap and hreflang).
- Right-to-left languages (`ar`, `he`, `fa`, `ur`) get `"dir": "rtl"`
  automatically.
- Translate keys by copying them from `locales/en.json` — only the keys you
  translate need to exist.
- `npm run lint:i18n` shows coverage per language and fails on typos
  (keys that don't exist in English) or broken `{placeholders}`.
- When it is ready, delete `"published": false` from its entry.

Add `--publish` to the command to skip the draft step.

## Why only some content is translated

`locales/*.json` holds interface text. Long-form content (case studies,
project descriptions, the CV timeline) lives in `data/portfolio.ts` in
English and is overridden per language by `data/translations/<code>.ts`.
Keys look like `projects.<id>.description`; `tests/unit/translations.test.ts`
fails if a key points at content that doesn't exist.

## Scaling to dozens of languages

- Only the active language is downloaded (UI file and overlay are lazy).
- Build time grows with `routes × languages`; 100 languages is roughly
  1,100 prerendered pages. If that gets slow, publish only the languages that
  reach a coverage you are happy with (`npm run lint:i18n -- --min 80`).
- Blog posts are English-only on purpose (see `BLOG_GUIDE.md`).
- Machine translation is a fine first draft for UI strings; have a native
  speaker read headings and the Hire section before publishing.
