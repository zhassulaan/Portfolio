<script setup lang='ts'>
import type { CaseStudy } from '@/types/portfolio';
import TagList from '@/components/ui/tag_list/tag_list.vue';
import { useLocaleText } from '@/composables/use_locale_text';

const props = defineProps<{ case_study: CaseStudy }>();
const { tx } = useLocaleText();

// Case studies are keyed by their existing `index` field ('01'-'04'),
// already unique and stable — see data/translations/*.ts.
const key = (field: string) => `case_studies.${props.case_study.index}.${field}`;
</script>

<template>
  <article v-reveal class='case_study_card'>
    <div class='case_study_card__rail'>
      <span v-text='case_study.index'></span>
      <i></i>
    </div>

    <div class='case_study_card__main'>
      <div class='case_study_card__meta'>
        <p v-text="tx(key('kicker'), case_study.kicker)"></p>
        <span v-text='case_study.company'></span>
      </div>

      <h3 v-text="tx(key('title'), case_study.title)"></h3>

      <div class='case_study_card__story'>
        <div>
          <small>{{ $t('case_studies.label_constraint') }}</small>
          <p v-text="tx(key('problem'), case_study.problem)"></p>
        </div>

        <div>
          <small>{{ $t('case_studies.label_move') }}</small>
          <p v-text="tx(key('solution'), case_study.solution)"></p>
        </div>

        <div>
          <small>{{ $t('case_studies.label_outcome') }}</small>
          <p v-text="tx(key('result'), case_study.result)"></p>
        </div>
      </div>

      <TagList :items="case_study.stack" />
    </div>

    <div class='case_study_card__metrics'>
      <div v-for='(metric, metric_index) in case_study.metrics' :key="metric.label">
        <strong v-text='metric.value'></strong>
        <span v-text="tx(key(`metrics.${metric_index}.label`), metric.label)"></span>
      </div>
    </div>
  </article>
</template>

<style src='./case_study_card.css'></style>
