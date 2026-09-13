<script setup lang='ts'>
import { principles } from '@/data/portfolio';
import { useLocaleText } from '@/composables/use_locale_text';

const { tx } = useLocaleText();
</script>

<template>
  <section class='principles_section section' id='principles'>
    <div class='wrap principles_section__inner'>
      <div v-reveal class='principles_section__intro'>
        <p class='eyebrow'>{{ $t('principles.eyebrow') }}</p>
        <h2>{{ $t('principles.heading') }}</h2>
        <p>{{ $t('principles.intro') }}</p>
      </div>

      <div class='principles_section__list'>
        <article class='principles_section__item'
          v-for='item in principles'
          :key="item.number"
          v-reveal>
          <span v-text='item.number'></span>
          <h3 v-text="tx(`principles.${item.number}.title`, item.title)"></h3>
          <p v-text="tx(`principles.${item.number}.text`, item.text)"></p>
        </article>
      </div>
    </div>
  </section>
</template>

<style src='./principles_section.css'></style>
