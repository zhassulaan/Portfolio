<script setup lang='ts'>
import type { CaseStudy } from '@/types/portfolio';
import TagList from '@/components/ui/tag_list/tag_list.vue';

defineProps<{ case_study: CaseStudy }>();
</script>

<template>
  <article v-reveal class='case_study_card'>
    <div class='case_study_card__rail'>
      <span v-text='case_study.index'></span>
      <i></i>
    </div>

    <div class='case_study_card__main'>
      <div class='case_study_card__meta'>
        <p v-text='case_study.kicker'></p>
        <span v-text='case_study.company'></span>
      </div>

      <h3 v-text='case_study.title'></h3>

      <div class='case_study_card__story'>
        <div>
          <small>Constraint</small>
          <p v-text='case_study.problem'></p>
        </div>

        <div>
          <small>Engineering move</small>
          <p v-text='case_study.solution'></p>
        </div>

        <div>
          <small>Outcome</small>
          <p v-text='case_study.result'></p>
        </div>
      </div>

      <TagList :items="case_study.stack" />
    </div>

    <div class='case_study_card__metrics'>
      <div v-for='metric in case_study.metrics' :key="metric.label">
        <strong v-text='metric.value'></strong>
        <span v-text='metric.label'></span>
      </div>
    </div>
  </article>
</template>

<style src='./case_study_card.css'></style>
