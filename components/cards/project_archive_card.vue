<script setup lang="ts">
import type { Project } from '@/types/portfolio';
import TagList from '@/components/ui/tag_list.vue';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <article v-reveal v-tilt class="project_archive_card">
    <a v-if="project.href" class="project_archive_card__media" :href="project.href" target="_blank" rel="noreferrer">
      <img class="project_archive_card__image" :src="project.image" :alt="`${project.title} interface`" loading="lazy" />
      <span class="project_archive_card__category">{{ project.category }}</span>
    </a>
    <div v-else class="project_archive_card__media">
      <img class="project_archive_card__image" :src="project.image" :alt="`${project.title} interface`" loading="lazy" />
      <span class="project_archive_card__category">{{ project.category }}</span>
    </div>

    <div class="project_archive_card__body">
      <div class="project_archive_card__heading">
        <h2 class="project_archive_card__title">{{ project.title }}</h2>
        <a v-if="project.href" class="project_archive_card__link" :href="project.href" target="_blank" rel="noreferrer" :aria-label="`Open ${project.title}`">↗</a>
      </div>
      <p class="project_archive_card__description">{{ project.description }}</p>
      <TagList :items="project.stack" />
    </div>
  </article>
</template>

<style src="@/assets/css/components/project_archive_card.css"></style>
