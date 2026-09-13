<script setup lang='ts'>
import type { Project } from '@/types/portfolio';
import TagList from '@/components/ui/tag_list/tag_list.vue';
import { useLocaleText } from '@/composables/use_locale_text';

const props = defineProps<{ project: Project }>();
const { tx } = useLocaleText();

const description = computed(() => tx(`projects.${props.project.id}.description`, props.project.description));
const note = computed(() => props.project.note ? tx(`projects.${props.project.id}.note`, props.project.note) : '');
</script>

<template>
  <article v-reveal class='selected_project_card'>
    <a class='selected_project_card__media'
      :href="project.href"
      target='_blank'
      rel='noreferrer'
      tabindex='-1'
      aria-hidden='true'>
      <img class='selected_project_card__image'
        :src="project.image"
        alt=''
        loading='lazy' />
      <span class='selected_project_card__category' v-text='project.category'></span>
    </a>

    <div class='selected_project_card__body'>
      <div class='selected_project_card__heading'>
        <h3 class='selected_project_card__title' v-text='project.title'></h3>
        <a class='selected_project_card__arrow'
          v-if='project.href'
          :href="project.href"
          target='_blank'
          rel='noreferrer'
          :aria-label="`Open ${project.title} (opens in a new tab)`"
        ><span aria-hidden='true'>↗</span></a>
      </div>

      <p class='selected_project_card__description' v-text='description'></p>
      <p class='selected_project_card__note' v-text='note'></p>
      <TagList :items="project.stack" />
    </div>
  </article>
</template>

<style src='./selected_project_card.css'></style>
