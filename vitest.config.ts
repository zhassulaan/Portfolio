import { defineVitestConfig } from '@nuxt/test-utils/config';

// environment: 'nuxt' starts a lightweight Nuxt context per test file, so
// auto-imports like useI18n and useState work as in the app.
//
// setupFiles: see tests/setup/web_storage.ts.
export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['tests/unit/**/*.test.ts'],
    setupFiles: ['tests/setup/web_storage.ts'],
    globals: true,
  },
});
