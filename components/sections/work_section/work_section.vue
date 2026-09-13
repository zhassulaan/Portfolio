<script setup lang='ts'>
import { surfaces } from '@/data/portfolio';
import SystemTile from '@/components/cards/system_tile/system_tile.vue';
</script>

<template>
  <section class='work_section section wrap' id='systems'>
    <div class='section_heading'>
      <div>
        <p class='eyebrow'>{{ $t('work.eyebrow') }}</p>
        <h2 v-html="$t('work.heading')"></h2>
      </div>
      <p>{{ $t('work.intro') }}</p>
    </div>

    <div class='work_section__grid'>
      <SystemTile v-for='surface in surfaces'
        :key="surface.index"
        :surface="surface"
      />
    </div>
  </section>
</template>

<style src='./work_section.css'></style>
