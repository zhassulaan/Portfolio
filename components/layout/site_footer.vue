<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};
</script>

<template>
  <footer class="site_footer wrap">
    <span>© {{ new Date().getFullYear() }} Zhassulan Serikuly</span>
    <span>Nuxt 3 · Vue 3 · TypeScript</span>
    <button class="site_footer__top" type="button" @click="scrollToTop">
      Back to top ↑
    </button>
  </footer>
</template>

<style src="@/assets/css/components/site_footer.css"></style>
