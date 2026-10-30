import { describe, expect, it } from 'vitest';
import { useProjectFilter } from '@/composables/use_project_filter';
import type { Project } from '@/types/portfolio';

const make_project = (overrides: Partial<Project>): Project => ({
  id: 'x',
  title: 'Title',
  category: 'Corporate',
  image: '',
  image_width: 1,
  image_height: 1,
  description: 'Description',
  stack: ['Vue.js'],
  ...overrides,
});

const projects: Project[] = [
  make_project({ id: 'a', title: 'Alpha Shop', category: 'E-commerce', stack: ['Nuxt.js', 'Vue.js'], description: 'An online pharmacy' }),
  make_project({ id: 'b', title: 'Beta Maps', category: 'GIS & Platforms', stack: ['React', 'Mapbox GL JS'], description: 'A map-first platform' }),
  make_project({ id: 'c', title: 'Gamma Site', category: 'Corporate', stack: ['Vue.js'], description: 'A company website' }),
];

describe('useProjectFilter', () => {
  it('returns every project when no filter is active', () => {
    const { filtered_projects } = useProjectFilter(projects);

    expect(filtered_projects.value.map((project) => project.id)).toEqual(['a', 'b', 'c']);
  });

  it('builds sorted category and stack options with "All" first, without duplicates', () => {
    const { categories, stacks } = useProjectFilter(projects);

    expect(categories.value).toEqual(['All', 'Corporate', 'E-commerce', 'GIS & Platforms']);
    expect(stacks.value).toEqual(['All', 'Mapbox GL JS', 'Nuxt.js', 'React', 'Vue.js']);
  });

  it('searches title, description, category and stack case-insensitively', () => {
    const { search_query, filtered_projects } = useProjectFilter(projects);

    search_query.value = '  MAPBOX ';
    expect(filtered_projects.value.map((project) => project.id)).toEqual(['b']);

    search_query.value = 'pharmacy';
    expect(filtered_projects.value.map((project) => project.id)).toEqual(['a']);
  });

  it('combines category and stack filters', () => {
    const { active_category, active_stack, filtered_projects } = useProjectFilter(projects);

    active_stack.value = 'Vue.js';
    expect(filtered_projects.value.map((project) => project.id)).toEqual(['a', 'c']);

    active_category.value = 'Corporate';
    expect(filtered_projects.value.map((project) => project.id)).toEqual(['c']);
  });

  it('reset_filters restores the full list', () => {
    const { search_query, active_category, active_stack, filtered_projects, reset_filters } = useProjectFilter(projects);

    search_query.value = 'nothing matches this';
    active_category.value = 'Corporate';
    active_stack.value = 'React';
    expect(filtered_projects.value).toEqual([]);

    reset_filters();
    expect(filtered_projects.value).toHaveLength(3);
  });
});
