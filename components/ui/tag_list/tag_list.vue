<script setup lang='ts'>
defineProps<{ items: string[] }>();
</script>

<template>
  <div class='tag_list'>
    <span class='tag_list__item'
      v-for='item in items'
      :key="item"
      v-text='item'>
    </span>
  </div>
</template>

<style src='./tag_list.css'></style>
