<script setup lang='ts'>
// One employer card in the CV timeline, with a button that asks the parent to
// open the details modal.
import { useLocaleText } from '@/composables/use_locale_text';
import type { Milestone } from '@/types/portfolio';

const props = defineProps<{ milestone: Milestone }>();
const { tx } = useLocaleText();

const emit = defineEmits<{
  (event: 'view-details', milestone: Milestone): void;
}>();

const translation_key = computed(() => props.milestone.id || props.milestone.company);
const has_detail = computed(() => !!(props.milestone.highlights?.length || props.milestone.roles?.length));
</script>

<template>
  <article class='milestone_card' v-reveal>
    <div class='milestone_card__head'>
      <img v-if='milestone.logo'
        :src='milestone.logo'
        :alt="`${milestone.company} logo`"
        width='64'
        height='64'>
      <div>
        <h3 v-text='milestone.company'></h3>
        <small v-text='milestone.period'></small>
      </div>
    </div>
    <p class='milestone_card__role' v-text="tx(`milestones.${translation_key}.role`, milestone.role)"></p>
    <p class='milestone_card__focus' v-text="tx(`milestones.${translation_key}.focus`, milestone.focus)"></p>
    <button class='milestone_card__trigger'
      v-if='has_detail'
      type='button'
      :aria-label="$t('cv_page.view_details_aria', { company: milestone.company })"
      v-on:click="emit('view-details', milestone)">
      {{ $t('cv_page.view_details') }} <span aria-hidden='true'>↗</span>
    </button>
  </article>
</template>

<style src='./milestone_card.css'></style>
