<script setup lang='ts'>
import type { Project } from '@/types/portfolio';
import TagList from '@/components/ui/tag_list/tag_list.vue';

defineProps<{ project: Project }>();
</script>

<template>
  <article class='project_archive_card' v-reveal v-tilt>
    <a class='project_archive_card__media'
      v-if='project.href'
      :href="project.href"
      target='_blank'
      rel='noreferrer'
      tabindex='-1'
      aria-hidden='true'>
      <img class='project_archive_card__image'
        :src="project.image"
        :alt="`${project.title} interface`"
        loading='lazy'
      />
      <span class='project_archive_card__category' v-text='project.category'></span>
    </a>

    <div v-else class='project_archive_card__media'>
      <img class='project_archive_card__image'
        :src="project.image"
        :alt="`${project.title} interface`"
        loading='lazy'
      />
      <span class='project_archive_card__category' v-text='project.category'></span>
    </div>

    <div class='project_archive_card__body'>
      <div class='project_archive_card__heading'>
        <h2 class='project_archive_card__title' v-text='project.title'></h2>
        <a class='project_archive_card__link'
          v-if='project.href'
          :href="project.href"
          target='_blank'
          rel='noreferrer'
          :aria-label="`Open ${project.title} (opens in a new tab)`">
          <span aria-hidden='true'>↗</span>
        </a>
      </div>
      <p class='project_archive_card__description' v-text='project.description'></p>
      <TagList :items="project.stack" />
    </div>
  </article>
</template>

<style src='./project_archive_card.css'></style>
