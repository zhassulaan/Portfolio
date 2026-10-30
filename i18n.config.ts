// vue-i18n runtime options for @nuxtjs/i18n (see nuxt.config.ts).
export default defineI18nConfig(() => ({
  legacy: false,
  // Keys missing from a partial translation fall back to English.
  fallbackLocale: 'en',
  missingWarn: false,
  fallbackWarn: false,
}));
