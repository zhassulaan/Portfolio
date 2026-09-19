<script setup lang='ts'>
// One employer card in the CV page's experience timeline — logo, company,
// period, role, focus line, and (when there's detail to show) a button
// that asks the parent to open the full-detail modal. Pulled out of
// pages/cv/index.vue so that page's template isn't carrying the full
// card markup inline for every milestone.
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
        :alt="`${milestone.company} logo`">
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
