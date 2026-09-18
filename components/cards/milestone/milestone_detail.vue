<script setup lang='ts'>
// The "view details" modal's body for one milestone — meta line, summary,
// and highlights, plus (when the employer has more than one role phase,
// e.g. a promotion) a phase selector that swaps which phase's highlights
// are shown. Fully self-contained: it owns its own selected-phase state
// rather than the parent tracking it, which is what let pages/cv/index.vue
// drop active_role_id/active_role/select_role/etc. entirely — the parent
// only needs to know *which milestone* is open, not which phase of it.
import { useLocaleText } from '@/composables/use_locale_text';
import type { Milestone, MilestoneRole } from '@/types/portfolio';

const props = defineProps<{ milestone: Milestone }>();
const { tx } = useLocaleText();

// Initialized once at setup time. The parent re-mounts this component each
// time a different milestone's modal opens (see pages/cv/index.vue), so
// this always starts fresh on the first/most-recent role phase rather than
// carrying over whatever was selected for a previously-viewed milestone.
const active_role_id = ref<string | null>(props.milestone.roles?.[0]?.id ?? null);

const active_role = computed<MilestoneRole | null>(() => {
  const roles = props.milestone.roles;
  if (!roles?.length) {
    return null;
  }
  return roles.find((candidate) => candidate.id === active_role_id.value) ?? roles[0];
});

const select_role = (role_id: string) => {
  active_role_id.value = role_id;
};

const translation_key = computed(() => props.milestone.id || props.milestone.company);

// Highlight translation keys nest under the selected phase (when there is
// one) so "Team Lead" and "Middle → Senior" get independently
// translatable text; the location/summary lines don't vary by phase, so
// they stay under the milestone's own key.
const active_translation_ns = computed(() => (
  active_role.value ? `${translation_key.value}.roles.${active_role.value.id}` : translation_key.value
));

const active_period = computed(() => active_role.value?.period ?? props.milestone.period);
const active_highlights = computed(() => active_role.value?.highlights ?? props.milestone.highlights ?? []);
</script>

<template>
  <div class='milestone_detail'>
    <div class='milestone_detail__roles'
      v-if='milestone.roles?.length'
      role='tablist'
      :aria-label="$t('cv_page.role_selector_aria')">
      <button v-for='r in milestone.roles'
        :key='r.id'
        type='button'
        class='milestone_detail__role_tab'
        :class="{ 'milestone_detail__role_tab--active': active_role?.id === r.id }"
        role='tab'
        :aria-selected='active_role?.id === r.id'
        v-on:click='select_role(r.id)'>
        {{ tx(`milestones.${translation_key}.roles.${r.id}.label`, r.label) }}
      </button>
    </div>

    <p class='milestone_detail__meta'>
      <span v-text='active_period'></span>
      <template v-if='milestone.location'>
        <span aria-hidden='true'> · </span>
        <span v-text="tx(`milestones.${translation_key}.location`, milestone.location)"></span>
      </template>
    </p>

    <p class='milestone_detail__summary'
      v-if='milestone.summary'
      v-text="tx(`milestones.${translation_key}.summary`, milestone.summary)">
    </p>

    <ul class='milestone_detail__highlights'>
      <li v-for='(highlight, index) in active_highlights' :key='highlight.label'>
        <strong v-text="tx(`milestones.${active_translation_ns}.highlight_${index}.label`, highlight.label)"></strong>
        <span v-text="tx(`milestones.${active_translation_ns}.highlight_${index}.text`, highlight.text)"></span>
      </li>
    </ul>
  </div>
</template>

<style src='./milestone_detail.css'></style>
