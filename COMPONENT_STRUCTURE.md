# Component structure

Each visual component owns its Vue template and stylesheet in the same folder.

```text
components/
├── cards/
│   ├── system_tile/
│   │   ├── system_tile.vue
│   │   └── system_tile.css
│   ├── case_study_card/
│   │   ├── case_study_card.vue
│   │   └── case_study_card.css
│   └── ...
├── layout/
├── sections/
└── ui/
```

Rules:

- Folder, Vue filename, CSS filename and BEM block use the same `snake_case` name.
- Component CSS is imported locally with `<style src="./component_name.css"></style>`.
- `assets/css/base.css` is reserved for global tokens, reset and truly shared utilities only.
- Page-only styles are colocated with the page. `/projects` uses `pages/projects/index.vue` and `pages/projects/projects_page.css`.
- New component example: create `components/cards/new_card/new_card.vue` and `components/cards/new_card/new_card.css`.
