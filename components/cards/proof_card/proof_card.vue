<script setup lang='ts'>
import type { ProofDocument } from '@/types/portfolio';
import { useLocaleText } from '@/composables/use_locale_text';

const props = defineProps<{ doc: ProofDocument }>();
const { t } = useI18n();
const { tx } = useLocaleText();
const local_path = useLocalePath();

const detail_href = computed(() => local_path(`/${props.doc.kind}/${props.doc.slug}`));
const kind_label = computed(() => (props.doc.kind === 'certificate' ? t('proof_page.kind_certificate') : t('proof_page.kind_recommendation')));
const title = computed(() => tx(`proof_documents.${props.doc.slug}.title`, props.doc.title));
const description = computed(() => tx(`proof_documents.${props.doc.slug}.description`, props.doc.description));
</script>

<template>
  <NuxtLink class='proof_card' :to='detail_href' v-reveal v-tilt>
    <div class='proof_card__head'>
      <span class='proof_card__kind' v-text='kind_label'></span>
      <span class='proof_card__arrow' aria-hidden='true' v-text="'↗'"></span>
    </div>

    <h2 class='proof_card__title' v-text='title'></h2>

    <p class='proof_card__meta'>
      <span v-text='doc.issuer'></span>
      <span aria-hidden='true' v-text="' · '"></span>
      <span v-text='doc.date'></span>
    </p>

    <p class='proof_card__description' v-text='description'></p>
  </NuxtLink>
</template>

<style src='./proof_card.css'></style>
