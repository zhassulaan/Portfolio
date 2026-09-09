<script setup lang="ts">
import SiteHeader from '@/components/layout/site_header.vue';
import SiteFooter from '@/components/layout/site_footer.vue';

useHead({
  titleTemplate: (title_chunk) => title_chunk ? `${title_chunk} · Zhassulan Serikuly` : 'Zhassulan Serikuly — Engineering Notebook',
  meta: [
    { name: 'description', content: 'Engineering portfolio of Zhassulan Serikuly — frontend architecture, performance, modernization, GIS and production systems.' },
  ],
});
</script>

<template>
  <div class="site_shell">
    <SiteHeader />
    <NuxtPage />
    <SiteFooter />
  </div>
</template>
