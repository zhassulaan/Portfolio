<script setup lang="ts">
import { signals } from '@/data/portfolio';
</script>

<template>
  <section id="signals" class="signal_section wrap">
    <div v-for="signal in signals" :key="signal.label" v-reveal class="signal_section__item">
      <strong>{{ signal.value }}</strong>
      <div><span>{{ signal.label }}</span><p>{{ signal.note }}</p></div>
    </div>
  </section>
</template>

<style src="@/assets/css/components/signal_section.css"></style>
