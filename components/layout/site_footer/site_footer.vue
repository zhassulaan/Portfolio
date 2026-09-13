<script setup lang='ts'>
const scrollToTop = () => {
  const prefers_reduced_motion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: prefers_reduced_motion ? 'instant' : 'smooth',
  });
};
</script>

<template>
  <footer class='site_footer wrap'>
    <span v-text='`© ${new Date().getFullYear()} Zhassulan Serikuly`'></span>
    <span>Nuxt 3 · Vue 3 · TypeScript</span>
    <button class='site_footer__top'
      type='button'
      v-on:click="scrollToTop">
      {{ $t('footer.back_to_top') }}
    </button>
  </footer>
</template>

<style src='./site_footer.css'></style>
