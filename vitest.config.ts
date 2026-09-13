import { defineVitestConfig } from '@nuxt/test-utils/config';

// environment: 'nuxt' boots a real (lightweight) Nuxt context for each test
// file, so composables that rely on Nuxt/vue-i18n auto-imports (useI18n,
// useState, …) work exactly as they do in the app — no manual global stubs
// needed for the common case.
export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['tests/unit/**/*.test.ts'],
    globals: true,
  },
});
