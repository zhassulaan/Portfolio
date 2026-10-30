import { defineVitestConfig } from '@nuxt/test-utils/config';

// environment: 'nuxt' boots a real (lightweight) Nuxt context for each test
// file, so composables that rely on Nuxt/vue-i18n auto-imports (useI18n,
// useState, …) work exactly as they do in the app — no manual global stubs
// needed for the common case.
//
// setupFiles: see tests/setup/web_storage.ts — keeps localStorage usable on
// Node versions whose experimental global shadows happy-dom's.
export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['tests/unit/**/*.test.ts'],
    setupFiles: ['tests/setup/web_storage.ts'],
    globals: true,
  },
});
