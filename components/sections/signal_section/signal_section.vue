<script setup lang='ts'>
import { signals } from '@/data/portfolio';
</script>

<template>
  <section class='signal_section wrap' id='signals'>
    <div class='signal_section__item'
      v-for='signal in signals'
      :key="signal.label"
      v-reveal>
      <strong v-text='signal.value'></strong>
      <div>
        <span v-text='signal.label'></span>
        <p v-text='signal.note'></p>
      </div>
    </div>
  </section>
</template>

<style src='./signal_section.css'></style>
