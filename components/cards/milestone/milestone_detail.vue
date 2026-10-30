<script setup lang='ts'>
// Body of the "view details" modal: meta line, summary and highlights, with a
// role selector when there is more than one role (for example after a promotion).
import { useLocaleText } from '@/composables/use_locale_text';
import type { Milestone, MilestoneRole } from '@/types/portfolio';

const props = defineProps<{ milestone: Milestone }>();
const { tx } = useLocaleText();

// The parent remounts this component for each milestone, so it starts on the latest role.
const active_role_id = ref<string | null>(props.milestone.roles?.[0]?.id ?? null);

const active_role = computed<MilestoneRole | null>(() => {
  const roles = props.milestone.roles;
  if (!roles?.length) {
    return null;
  }
  return roles.find((candidate) => candidate.id == active_role_id.value) ?? roles[0];
});

function select_role(role_id: string) {
  active_role_id.value = role_id;
}

const translation_key = computed(() => props.milestone.id || props.milestone.company);

// Highlight keys are nested under the selected role so each role translates
// separately. Location and summary use the milestone key.
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
      <button class='milestone_detail__role_tab'
        :class="{ 'milestone_detail__role_tab--active': active_role?.id == r.id }"
        v-for='r in milestone.roles'
        :key='r.id'
        type='button'
        role='tab'
        :aria-selected='active_role?.id == r.id'
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
