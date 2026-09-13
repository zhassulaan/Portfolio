<script setup lang='ts'>
import { projects } from '@/data/portfolio';
import { useProjectFilter } from '@/composables/use_project_filter';
import ProjectArchiveCard from '@/components/cards/project_archive_card/project_archive_card.vue';

const { t } = useI18n();
const local_path = useLocalePath();

const {
  search_query,
  active_category,
  active_stack,
  categories,
  stacks,
  filtered_projects,
  reset_filters,
} = useProjectFilter(projects);

// Category/stack values stay in English (they're canonical filter values,
// matched against data/portfolio.ts) — only the 'All' option is translated
// for display.
const option_label = (value: string) => (value === 'All' ? t('projects_page.category_all') : value);

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  });
});

useHead({
  title: () => t('nav.projects'),
  meta: [
    {
      name: 'description',
      content: computed(() => t('projects_page.intro')),
    },
  ],
});
</script>

<template>
  <main class='projects_page' id='main_content' tabindex='-1'>
    <section class='projects_page__hero wrap'>
      <div v-reveal class='projects_page__heading'>
        <NuxtLink class='projects_page__back' :to="local_path('/')">
          <span aria-hidden='true'>←</span> {{ $t('projects_page.back_link') }}
        </NuxtLink>
        <p class='eyebrow'>{{ $t('projects_page.eyebrow') }}</p>
        <h1 class='projects_page__title' v-html="$t('projects_page.heading')"></h1>
      </div>

      <p v-reveal class='projects_page__intro'>
        {{ $t('projects_page.intro') }}
      </p>
    </section>

    <section class='projects_page__controls wrap' aria-label='Project filters'>
      <label class='projects_page__search'>
        <span>{{ $t('projects_page.search_label') }}</span>
        <input v-model='search_query'
          type='search'
          :placeholder="$t('projects_page.search_placeholder')" />
      </label>

      <label class='projects_page__select'>
        <span>{{ $t('projects_page.category_label') }}</span>
        <select v-model='active_category'>
          <option v-for='category in categories'
            :key="category"
            :value="category" v-text='option_label(category)'></option>
        </select>
      </label>

      <label class='projects_page__select'>
        <span>{{ $t('projects_page.stack_label') }}</span>
        <select v-model='active_stack'>
          <option v-for='stack in stacks'
            :key="stack"
            :value="stack" v-text='option_label(stack)'></option>
        </select>
      </label>

      <button class='projects_page__reset'
        type='button'
        v-on:click="reset_filters">
        {{ $t('projects_page.reset') }}
      </button>
    </section>

    <section class='projects_page__results wrap'>
      <div class='projects_page__result_meta' aria-live='polite'>
        <strong v-text='filtered_projects.length'></strong>
        <span v-text="filtered_projects.length === 1 ? $t('projects_page.result_singular') : $t('projects_page.result_plural')"></span>
      </div>

      <div class='projects_page__grid' v-if='filtered_projects.length'>
        <ProjectArchiveCard v-for='project in filtered_projects'
          :key="project.id"
          :project="project" />
      </div>

      <div class='projects_page__empty' v-else>
        <strong>{{ $t('projects_page.empty_title') }}</strong>
        <p>{{ $t('projects_page.empty_text') }}</p>
        <button class='button'
          type='button'
          v-on:click="reset_filters">
          {{ $t('projects_page.reset_filters') }}
        </button>
      </div>
    </section>
  </main>
</template>

<style src='./projects_page.css'></style>
