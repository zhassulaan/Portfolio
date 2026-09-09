<script setup lang="ts">
import { featured_projects } from '@/data/portfolio';
import SelectedProjectCard from '@/components/cards/selected_project_card.vue';
</script>

<template>
  <section id="builds" class="selected_projects_section section">
    <div class="wrap">
      <div class="section_heading">
        <div>
          <p class="eyebrow">Selected builds</p>
          <h2>A few products.<br />Not the whole archive.</h2>
        </div>
        <p>
          These are here to give the engineering notebook a visual layer. They are not a second résumé and they are not meant to list every project I have shipped.
        </p>
      </div>

      <div class="selected_projects_section__grid">
        <SelectedProjectCard
          v-for="project in featured_projects"
          :key="project.title"
          :project="project"
        />
      </div>

      <div class="selected_projects_section__footer">
        <NuxtLink class="selected_projects_section__more" to="/projects">
          Browse all projects
          <span>↗</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style src="@/assets/css/components/selected_projects_section.css"></style>
