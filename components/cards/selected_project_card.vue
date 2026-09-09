<script setup lang="ts">
import type { Project } from '@/types/portfolio';
import TagList from '@/components/ui/tag_list.vue';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <article v-reveal class="selected_project_card">
    <a
      class="selected_project_card__media"
      :href="project.href"
      target="_blank"
      rel="noreferrer"
    >
      <img
        class="selected_project_card__image"
        :src="project.image"
        :alt="`${project.title} interface`"
        loading="lazy"
      />
            <span class="selected_project_card__category">{{ project.category }}</span>
    </a>

    <div class="selected_project_card__body">
      <div class="selected_project_card__heading">
        <h3 class="selected_project_card__title">{{ project.title }}</h3>
        <a
          v-if="project.href"
          class="selected_project_card__arrow"
          :href="project.href"
          target="_blank"
          rel="noreferrer"
          aria-label="Open project"
        >↗</a>
      </div>
      <p class="selected_project_card__description">{{ project.description }}</p>
      <p class="selected_project_card__note">{{ project.note }}</p>
      <TagList :items="project.stack" />
    </div>
  </article>
</template>

<style src="@/assets/css/components/selected_project_card.css"></style>
