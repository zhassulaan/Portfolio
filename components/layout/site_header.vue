<script setup lang="ts">
const nav_items = [
  { label: 'Signals', to: '/#signals' }, { label: 'Cases', to: '/#cases' }, { label: 'Builds', to: '/#builds' }, { label: 'Projects', to: '/projects' }, { label: 'Path', to: '/#path' }, { label: 'Contact', to: '/#contact' },
];
</script>

<template>
  <header class="site_header">
    <NuxtLink class="site_header__brand" to="/" aria-label="Home">
      <span class="site_header__brand_text">ZS</span>
    </NuxtLink>

    <nav class="site_header__nav" aria-label="Primary navigation">
      <NuxtLink
        v-for="item in nav_items"
        :key="item.to"
        class="site_header__nav_link"
        :to="item.to"
      >
        <span class="site_header__nav_text">{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <a class="site_header__cta" href="mailto:zhassulan.serikuly@gmail.com">
      <span class="site_header__cta_text">Start a conversation</span>
      <i class="site_header__cta_arrow">↗</i>
    </a>
  </header>
</template>

<style src="@/assets/css/components/site_header.css"></style>
