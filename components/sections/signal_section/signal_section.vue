<script setup lang='ts'>
import { signals } from '@/data/portfolio';
import { useLocaleText } from '@/composables/use_locale_text';

const { tx } = useLocaleText();
</script>

<template>
  <section class='signal_section wrap' id='signals'>
    <div class='signal_section__item'
      v-for='(signal, index) in signals'
      :key="signal.label"
      v-reveal>
      <strong v-text='signal.value'></strong>
      <div>
        <span v-text="tx(`signals.${index}.label`, signal.label)"></span>
        <p v-text="tx(`signals.${index}.note`, signal.note)"></p>
      </div>
    </div>
  </section>
</template>

<style src='./signal_section.css'></style>
