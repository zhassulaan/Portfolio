<script setup lang="ts">
import type { Surface } from '@/types/portfolio';
import TagList from '@/components/ui/tag_list.vue';

defineProps<{ surface: Surface }>();
</script>

<template>
  <article v-reveal class="system_tile" :class="`system_tile--${surface.variant}`">
    <div class="system_tile__visual" aria-hidden="true">
      <span class="system_tile__index">{{ surface.index }}</span>
      <div class="system_tile__pattern">
        <i v-for="n in 12" :key="n"></i>
      </div>
    </div>
    <div class="system_tile__body">
      <h3>{{ surface.title }}</h3>
      <p>{{ surface.text }}</p>
      <TagList :items="surface.tags" />
    </div>
  </article>
</template>

<style src="@/assets/css/components/system_tile.css"></style>
