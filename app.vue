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
  link: [{ rel: 'alternate', type: 'application/rss+xml', title: 'Blog', href: '/rss.xml' }],
  titleTemplate: (title_chunk) => title_chunk ? `${title_chunk} · ${t('site.title_suffix')}` : t('site.default_title'),
  meta: [{
    name: 'description',
    content: computed(() => t('site.description')),
  }],
});

// Canonical link, hreflang alternates and og:locale, generated from the i18n
// block in nuxt.config.ts.
const i18n_head = useLocaleHead({ lang: false, seo: true });
useHead(() => ({
  link: i18n_head.value.link,
  meta: i18n_head.value.meta,
}));

// Site-wide Open Graph / Twitter Card defaults. A page can set its own og:title
// and og:description on top (unhead merges by meta key).
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

// Person JSON-LD, once for the whole site.
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Zhassulan Serikuly',
      jobTitle: 'Senior Software Engineer',
      knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'Frontend architecture', 'Web performance'],
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
