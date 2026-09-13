<script setup lang='ts'>
import { case_studies } from '@/data/portfolio';
import CaseStudyCard from '@/components/cards/case_study_card/case_study_card.vue';
</script>

<template>
  <section class='case_studies_section section' id='cases'>
    <div class='wrap'>
      <div class='section_heading'>
        <div>
          <p class='eyebrow'>{{ $t('case_studies.eyebrow') }}</p>
          <h2>{{ $t('case_studies.heading') }}</h2>
        </div>

        <p>{{ $t('case_studies.intro') }}</p>
      </div>

      <div class='case_studies_section__list'>
        <CaseStudyCard v-for='item in case_studies' :key="item.index" :case_study="item" />
      </div>
    </div>
  </section>
</template>

<style src='./case_studies_section.css'></style>
