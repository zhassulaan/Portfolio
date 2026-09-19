<script setup lang='ts'>
// One fieldset of segmented-button options in the accessibility panel —
// color scheme, font size, image mode, and text-to-speech all render the
// same legend + button-group (+ optional hint) markup, so it's pulled out
// here instead of being repeated four times in accessibility_panel.vue.
export interface AccessibilityOption {
  value: string | boolean;
  label: string;
  sample?: string;
  extra_class?: string;
}

defineProps<{
  legend: string;
  aria_label: string;
  options: AccessibilityOption[];
  active: string | boolean;
  hint?: string;
}>();

const emit = defineEmits<{
  (event: 'select', value: string | boolean): void;
}>();
</script>

<template>
  <fieldset class='accessibility_option_group'>
    <legend v-text='legend'></legend>
    <div class='accessibility_option_group__options'
      role='group'
      :aria-label='aria_label'>
      <button class='accessibility_option_group__option'
        :class="[option.extra_class, { 'accessibility_option_group__option--active': active === option.value }]"
        v-for='option in options'
        :key="String(option.value)"
        type='button'
        :aria-pressed='active === option.value'
        v-on:click="emit('select', option.value)">
        <span class='accessibility_option_group__sample'
          v-if='option.sample'
          aria-hidden='true'
          v-text='option.sample'>
        </span>
        <span v-text='option.label'></span>
      </button>
    </div>
    <p class='accessibility_option_group__hint'
      v-if='hint'
      v-text='hint'>
    </p>
  </fieldset>
</template>

<style src='./accessibility_option_group.css'></style>
