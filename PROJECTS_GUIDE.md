# Projects: one source of truth

All project content lives in `data/portfolio.ts` inside the exported `projects` array.

The home page and `/projects` page use this same array. Do **not** create a second project list.

## Add a new project

1. Add the screenshot to `assets/images/projects/`, for example `my_project.png`.
2. Import it at the top of `data/portfolio.ts`:

```ts
import my_project_image from '@/assets/images/projects/my_project.png';
```

3. Add one object to `projects`:

```ts
{
  id: 'my-project',
  title: 'My Project',
  category: 'E-commerce',
  image: my_project_image,
  description: 'Short description that explains what the product is and what kind of frontend/product problem it represents.',
  stack: ['Nuxt.js', 'Vue.js', 'TypeScript'],
  href: 'https://example.com',
  featured: false,
},
```

That is enough. The `/projects` page automatically includes it in:

- name/description/stack search;
- category filter;
- stack filter;
- result count.

Set `featured: true` only when you also want the project on the home page in **Selected builds**. The home list is generated with:

```ts
export const featured_projects = projects.filter((project) => project.featured);
```

Keep only about 4 featured projects so the home page stays curated instead of becoming another LinkedIn/CV page.

## Navigation behavior

Route changes use `app/router.options.ts`. Moving from the home page to `/projects` always starts the new page at the top. Hash navigation on the home page still scrolls smoothly to the relevant section with an offset for the sticky header.
