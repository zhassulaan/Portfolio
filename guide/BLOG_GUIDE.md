# Writing a blog post

Posts live in `data/blog_posts.ts` as plain data — no Markdown parser, no
extra dependency, nothing rendered with `v-html`.

```ts
{
  slug: 'my-post',            // URL: /blog/my-post — lowercase, hyphens
  title: '…',
  date: '2026-10-16',         // ISO date; newest first in the array
  summary: '…',               // used in the list, meta description, social cards
  tags: ['Next.js', 'Performance'],
  blocks: [
    { type: 'p', text: '…' },
    { type: 'h2', text: '…' },
    { type: 'list', items: ['…', '…'] },
    { type: 'code', language: 'ts', text: 'const x = 1;' },
  ],
}
```

After adding a post run `npm run sitemap` so the new URL is listed.
`npm run test:unit` checks slugs, dates and structure.

The two starter posts were drafted from the facts in the case studies
(`data/portfolio.ts`). Before relying on them, read them once and add the
details only you know — real numbers, what went wrong, what you would do
differently. Specific, first-hand detail is what makes a post worth reading.

Posts are English-only: the list and post pages show a short note in other
languages. Translating long articles is rarely worth it; the interface around
them is translated.
