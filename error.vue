<script setup lang='ts'>
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();

const is_not_found = computed(() => props.error.statusCode == 404);

const heading = computed(() => is_not_found.value
  ? 'Page not found'
  : 'Something went wrong');

const message = computed(() => is_not_found.value
  ? "The page you're looking for doesn't exist, or it may have moved."
  : (props.error.statusMessage || 'An unexpected error occurred.'));

function go_home() {
  clearError({ redirect: '/' });
}
</script>

<template>
  <main class='error_page'
    id='main_content'
    tabindex='-1'>
    <div class='error_page__inner wrap' v-reveal>
      <p class='eyebrow'>Error {{ error.statusCode }}</p>
      <h1 class='error_page__title'>{{ heading }}</h1>
      <p class='error_page__message'>{{ message }}</p>

      <div class='error_page__actions'>
        <button class='button'
          type='button'
          v-on:click="go_home">
          Back to home <span aria-hidden='true'>→</span>
        </button>
        <a class='button button--ghost' href='mailto:zhassulan.serikuly@gmail.com'>
          Email me
        </a>
      </div>
    </div>
  </main>
</template>

<style src='./error.css'></style>
