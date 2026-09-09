import type { Project } from '@/types/portfolio';

export const useProjectFilter = (projects: Project[]) => {
  const search_query = ref('');
  const active_category = ref('All');
  const active_stack = ref('All');

  const categories = computed(() => [
    'All',
    ...Array.from(new Set(projects.map((project) => project.category))).sort(),
  ]);

  const stacks = computed(() => [
    'All',
    ...Array.from(new Set(projects.flatMap((project) => project.stack))).sort(),
  ]);

  const filtered_projects = computed(() => {
    const query = search_query.value.trim().toLowerCase();

    return projects.filter((project) => {
      const searchable_text = [
        project.title,
        project.description,
        project.category,
        ...project.stack,
      ].join(' ').toLowerCase();

      const matches_search = !query || searchable_text.includes(query);
      const matches_category = active_category.value === 'All' || project.category === active_category.value;
      const matches_stack = active_stack.value === 'All' || project.stack.includes(active_stack.value);

      return matches_search && matches_category && matches_stack;
    });
  });

  const reset_filters = () => {
    search_query.value = '';
    active_category.value = 'All';
    active_stack.value = 'All';
  };

  return {
    search_query,
    active_category,
    active_stack,
    categories,
    stacks,
    filtered_projects,
    reset_filters,
  };
};
