<script setup lang="ts">
defineProps<{ items: string[] }>();
</script>

<template>
  <div class="tag_list">
    <span v-for="item in items" :key="item" class="tag_list__item">{{ item }}</span>
  </div>
</template>

<style src="@/assets/css/components/tag_list.css"></style>
