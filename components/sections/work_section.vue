<script setup lang="ts">
import { surfaces } from '@/data/portfolio';
import SystemTile from '@/components/cards/system_tile.vue';
</script>

<template>
  <section id="systems" class="work_section section wrap">
    <div class="section_heading">
      <div>
        <p class="eyebrow">Systems I like working on</p>
        <h2>No client gallery.<br />Just the engineering terrain.</h2>
      </div>
      <p>LinkedIn can list projects and employers. Here I would rather show the kinds of systems where my work becomes most valuable.</p>
    </div>
    <div class="work_section__grid">
      <SystemTile v-for="surface in surfaces" :key="surface.index" :surface="surface" />
    </div>
  </section>
</template>

<style src="@/assets/css/components/work_section.css"></style>
