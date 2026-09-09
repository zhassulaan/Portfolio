<script setup lang="ts">
import { principles } from '@/data/portfolio';
</script>

<template>
  <section id="principles" class="principles_section section">
    <div class="wrap principles_section__inner">
      <div v-reveal class="principles_section__intro"><p class="eyebrow">Operating principles</p><h2>The rules behind the code.</h2><p>Tools change. These are the habits I expect to keep.</p></div>
      <div class="principles_section__list">
        <article v-for="item in principles" :key="item.number" v-reveal class="principles_section__item"><span>{{ item.number }}</span><h3>{{ item.title }}</h3><p>{{ item.text }}</p></article>
      </div>
    </div>
  </section>
</template>

<style src="@/assets/css/components/principles_section.css"></style>
