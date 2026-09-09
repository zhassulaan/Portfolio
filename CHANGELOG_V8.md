# v8 fixes

- Fixed sticky-header anchor overlap by using one 112px anchor offset.
- Removed global CSS smooth scrolling so route changes do not animate from the previous page position.
- `/projects` now explicitly opens at scroll position `0` with `behavior: 'auto'`.
- Same-page anchor navigation remains smooth through Nuxt router behavior.
- Changed project-card mouse spotlight from white/purple to red and matched the hover border/shadow.
- Increased sticky-header surface opacity so content behind it no longer visually interferes with navigation.
