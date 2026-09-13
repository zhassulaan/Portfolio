<script setup lang='ts'>
import SiteHeader from '@/components/layout/site_header/site_header.vue';
import SiteFooter from '@/components/layout/site_footer/site_footer.vue';
import AccessibilityPanel from '@/components/ui/accessibility_panel/accessibility_panel.vue';

const { t, locale } = useI18n();

useHead({
  htmlAttrs: {
    lang: locale,
  },
  titleTemplate: (title_chunk) => title_chunk ? `${title_chunk} · ${t('site.title_suffix')}` : t('site.default_title'),
  meta: [{
    name: 'description',
    content: computed(() => t('site.description')),
  }],
});
</script>

<template>
  <div class='site_shell'>
    <a class='skip_link' href='#main_content'>Skip to content</a>
    <SiteHeader />
    <NuxtPage />
    <SiteFooter />
    <AccessibilityPanel />
  </div>
</template>
