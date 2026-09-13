<script setup lang='ts'>
import { featured_projects } from '@/data/portfolio';
import SelectedProjectCard from '@/components/cards/selected_project_card/selected_project_card.vue';

const local_path = useLocalePath();
</script>

<template>
  <section class='selected_projects_section section' id='builds'>
    <div class='wrap'>
      <div class='section_heading'>
        <div>
          <p class='eyebrow'>{{ $t('selected_projects.eyebrow') }}</p>
          <h2 v-html="$t('selected_projects.heading')"></h2>
        </div>
        <p>{{ $t('selected_projects.intro') }}</p>
      </div>

      <div class='selected_projects_section__grid'>
        <SelectedProjectCard v-for='project in featured_projects'
          :key="project.title"
          :project="project"
        />
      </div>

      <div class='selected_projects_section__footer'>
        <NuxtLink class='selected_projects_section__more' :to="local_path('/projects')">
          {{ $t('selected_projects.browse_all') }}
          <span aria-hidden='true'>↗</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style src='./selected_projects_section.css'></style>
