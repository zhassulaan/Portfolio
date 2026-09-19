<script setup lang='ts'>
import { useThemeStore, type ThemePreference } from '@/stores/theme';

const theme_store = useThemeStore();
const { preference } = storeToRefs(theme_store);
const { set_preference } = theme_store;

const options: Array<{ value: ThemePreference; label: string; icon: string }> = [{
  value: 'light',
  label: 'Light theme',
  icon: '☀',
}, {
  value: 'dark',
  label: 'Dark theme',
  icon: '☾',
}, {
  value: 'auto',
  label: 'Match system theme',
  icon: '◐',
}];
</script>

<template>
  <div class='theme_toggle'
    role='group'
    aria-label='Color theme'>
    <button class='theme_toggle__option'
      :class="{ 'theme_toggle__option--active': preference == option.value }"
      :title="option.label"
      v-for='option in options'
      :key="option.value"
      type='button'
      :aria-pressed="preference == option.value"
      :aria-label="option.label"
      v-on:click="set_preference(option.value)">
      <span class='theme_toggle__icon'
        aria-hidden='true'
        v-text='option.icon'>
      </span>
    </button>
  </div>
</template>

<style src='./theme_toggle.css'></style>
