<script setup lang='ts'>
import { principles } from '@/data/portfolio';
</script>

<template>
  <section class='principles_section section' id='principles'>
    <div class='wrap principles_section__inner'>
      <div v-reveal class='principles_section__intro'>
        <p class='eyebrow'>Operating principles</p>
        <h2>The rules behind the code.</h2>
        <p>Tools change. These are the habits I expect to keep.</p>
      </div>

      <div class='principles_section__list'>
        <article class='principles_section__item'
          v-for='item in principles'
          :key="item.number"
          v-reveal>
          <span v-text='item.number'></span>
          <h3 v-text='item.title'></h3>
          <p v-text='item.text'></p>
        </article>
      </div>
    </div>
  </section>
</template>

<style src='./principles_section.css'></style>
