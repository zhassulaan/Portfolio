<script setup lang='ts'>
import type { ProofDocument } from '@/types/portfolio';

const props = defineProps<{ doc: ProofDocument }>();

const detail_href = computed(() => `/${props.doc.kind}/${props.doc.slug}`);
const kind_label = computed(() => (props.doc.kind === 'certificate' ? 'Certificate' : 'Recommendation'));
</script>

<template>
  <NuxtLink class='proof_card' :to='detail_href' v-reveal v-tilt>
    <div class='proof_card__head'>
      <span class='proof_card__kind' v-text='kind_label'></span>
      <span class='proof_card__arrow' aria-hidden='true' v-text="'↗'"></span>
    </div>

    <h2 class='proof_card__title' v-text='doc.title'></h2>

    <p class='proof_card__meta'>
      <span v-text='doc.issuer'></span>
      <span aria-hidden='true' v-text="' · '"></span>
      <span v-text='doc.date'></span>
    </p>

    <p class='proof_card__description' v-text='doc.description'></p>
  </NuxtLink>
</template>

<style src='./proof_card.css'></style>
