<script setup lang="ts">
import type { CaseStudy } from '@/types/portfolio';
import TagList from '@/components/ui/tag_list.vue';

defineProps<{ case_study: CaseStudy }>();
</script>

<template>
  <article v-reveal class="case_study_card">
    <div class="case_study_card__rail"><span>{{ case_study.index }}</span><i></i></div>
    <div class="case_study_card__main">
      <div class="case_study_card__meta"><p>{{ case_study.kicker }}</p><span>{{ case_study.company }}</span></div>
      <h3>{{ case_study.title }}</h3>
      <div class="case_study_card__story">
        <div><small>Constraint</small><p>{{ case_study.problem }}</p></div>
        <div><small>Engineering move</small><p>{{ case_study.solution }}</p></div>
        <div><small>Outcome</small><p>{{ case_study.result }}</p></div>
      </div>
      <TagList :items="case_study.stack" />
    </div>
    <div class="case_study_card__metrics">
      <div v-for="metric in case_study.metrics" :key="metric.label"><strong>{{ metric.value }}</strong><span>{{ metric.label }}</span></div>
    </div>
  </article>
</template>

<style src="@/assets/css/components/case_study_card.css"></style>
