// Plausible analytics: cookie-free, so no consent banner. Only loaded when
// NUXT_PUBLIC_ANALYTICS_DOMAIN is set, so dev and preview builds stay out of the stats.
export default defineNuxtPlugin(() => {
  const { public: config } = useRuntimeConfig();

  if (!config.analyticsDomain) {
    return;
  }

  useHead({
    script: [{
      key: 'analytics',
      src: config.analyticsScriptSrc,
      defer: true,
      'data-domain': config.analyticsDomain,
    }],
  });
});
