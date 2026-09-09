<script setup lang="ts">
import { projects } from '@/data/portfolio';
import { useProjectFilter } from '@/composables/use_project_filter';
import ProjectArchiveCard from '@/components/cards/project_archive_card.vue';

const {
  search_query,
  active_category,
  active_stack,
  categories,
  stacks,
  filtered_projects,
  reset_filters,
} = useProjectFilter(projects);

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto',
  });
});

useHead({
  title: 'Projects',
  meta: [
    { name: 'description', content: 'A searchable archive of selected web, platform, GIS, commerce, booking and product work by Zhassulan Serikuly.' },
  ],
});
</script>

<template>
  <main class="projects_page">
    <section class="projects_page__hero wrap">
      <div v-reveal class="projects_page__heading">
        <NuxtLink class="projects_page__back" to="/">← Engineering notebook</NuxtLink>
        <p class="eyebrow">Project archive</p>
        <h1 class="projects_page__title">The builds behind<br />the notebook.</h1>
      </div>
      <p v-reveal class="projects_page__intro">Search by project name, what it does, or any technology in its stack. The home page stays curated; this page is the wider archive.</p>
    </section>

    <section class="projects_page__controls wrap" aria-label="Project filters">
      <label class="projects_page__search">
        <span>Search</span>
        <input v-model="search_query" type="search" placeholder="Try “Mapbox”, “booking”, “React”…" />
      </label>

      <label class="projects_page__select">
        <span>Category</span>
        <select v-model="active_category">
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </label>

      <label class="projects_page__select">
        <span>Stack</span>
        <select v-model="active_stack">
          <option v-for="stack in stacks" :key="stack" :value="stack">{{ stack }}</option>
        </select>
      </label>

      <button class="projects_page__reset" type="button" @click="reset_filters">Reset</button>
    </section>

    <section class="projects_page__results wrap">
      <div class="projects_page__result_meta">
        <strong>{{ filtered_projects.length }}</strong>
        <span>{{ filtered_projects.length === 1 ? 'project' : 'projects' }}</span>
      </div>

      <div v-if="filtered_projects.length" class="projects_page__grid">
        <ProjectArchiveCard v-for="project in filtered_projects" :key="project.id" :project="project" />
      </div>

      <div v-else class="projects_page__empty">
        <strong>No matching projects.</strong>
        <p>Try a broader search or reset the filters.</p>
        <button class="button" type="button" @click="reset_filters">Reset filters</button>
      </div>
    </section>
  </main>
</template>

<style src="@/assets/css/components/projects_page.css"></style>
