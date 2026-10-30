<script setup lang='ts'>
import SiteHeader from '@/components/layout/site_header/site_header.vue';
import SiteFooter from '@/components/layout/site_footer/site_footer.vue';
import AccessibilityPanel from '@/components/ui/accessibility_panel/accessibility_panel.vue';

const { t, locale, locales } = useI18n();
const route = useRoute();
const { public: public_config } = useRuntimeConfig();

// From runtimeConfig (nuxt.config.ts); i18n.baseUrl there uses the same value.
const SITE_URL = public_config.siteUrl;
const CONTACT_EMAIL = public_config.contactEmail;

// RTL languages are marked with "dir": "rtl" in config/locales.json.
const text_direction = computed(() => {
  const current = (locales.value as Array<{ code: string; dir?: string }>).find((item) => item.code == locale.value);

  return current?.dir ?? 'ltr';
});
const canonical_url = computed(() => `${SITE_URL}${route.path}`);
const og_image_url = `${SITE_URL}/og-image.jpg`;

useHead({
  htmlAttrs: {
    lang: locale,
    dir: text_direction,
  },
  titleTemplate: (title_chunk) => title_chunk ? `${title_chunk} · ${t('site.title_suffix')}` : t('site.default_title'),
  meta: [{
    name: 'description',
    content: computed(() => t('site.description')),
  }],
});

// Canonical link + per-locale hreflang alternates + og:locale(:alternate),
// generated from nuxt.config.ts's i18n block instead of hand-listing 7
// locale codes here — stays correct if a locale is ever added or removed.
const i18n_head = useLocaleHead({ lang: false, seo: true });
useHead(() => ({
  link: i18n_head.value.link,
  meta: i18n_head.value.meta,
}));

// Open Graph / Twitter Card site-wide defaults. A page can still layer its
// own og:title/og:description on top (see pages/index.vue and
// proof_detail_section.vue) — unhead merges by meta key, so a more
// specific page-level tag wins over these without needing to repeat the
// rest of the OG/Twitter set on every page.
useSeoMeta({
  ogType: 'website',
  ogSiteName: computed(() => t('site.title_suffix')),
  ogTitle: computed(() => t('site.default_title')),
  ogDescription: computed(() => t('site.description')),
  ogUrl: canonical_url,
  ogImage: og_image_url,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => t('site.default_title')),
  twitterDescription: computed(() => t('site.description')),
  twitterImage: og_image_url,
});

// Person JSON-LD — describes the site owner once, site-wide rather than
// per-route (a person doesn't change per page).
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Zhassulan Serikuly',
      jobTitle: 'Senior Software Engineer',
      url: SITE_URL,
      image: og_image_url,
      email: `mailto:${CONTACT_EMAIL}`,
      sameAs: [
        'https://www.linkedin.com/in/zhassulan-serikuly',
        'https://github.com/zhassulaan',
      ],
    }),
  }],
});
</script>

<template>
  <div class='site_shell'>
    <a class='skip_link' href='#main_content'>{{ $t('header.skip_to_content') }}</a>
    <SiteHeader />
    <NuxtPage />
    <SiteFooter />
    <AccessibilityPanel />
  </div>
</template>
