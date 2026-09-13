<script setup lang='ts'>
const { locale, locales } = useI18n();
const switch_locale_path = useSwitchLocalePath();

const is_open = ref(false);
const root = ref<HTMLElement | null>(null);

const available_locales = computed(() =>
  (locales.value as Array<{ code: string; name?: string }>),
);

const current_locale = computed(() =>
  available_locales.value.find((item) => item.code === locale.value),
);

const toggle_open = () => {
  is_open.value = !is_open.value;
};

const close = () => {
  is_open.value = false;
};

const handle_click_outside = (event: MouseEvent) => {
  if (!is_open.value) {
    return;
  }

  if (!root.value?.contains(event.target as Node)) {
    close();
  }
};

const handle_keydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && is_open.value) {
    close();
  }
};

onMounted(() => {
  window.addEventListener('click', handle_click_outside);
  window.addEventListener('keydown', handle_keydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handle_click_outside);
  window.removeEventListener('keydown', handle_keydown);
});
</script>

<template>
  <div class='language_switcher' ref='root'>
    <button class='language_switcher__toggle'
      type='button'
      :aria-expanded='is_open'
      aria-haspopup='listbox'
      :aria-label="$t('header.language')"
      v-on:click='toggle_open'>
      <span aria-hidden='true'>{{ locale.toUpperCase() }}</span>
    </button>

    <ul class='language_switcher__menu'
      role='listbox'
      v-if='is_open'
      :aria-label="$t('header.language')">
      <li v-for='item in available_locales' :key='item.code'>
        <NuxtLink class='language_switcher__option'
          :class="{ 'language_switcher__option--active': item.code === locale }"
          :to='switch_locale_path(item.code)'
          role='option'
          :aria-selected='item.code === locale'
          v-on:click='close'>
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style src='./language_switcher.css'></style>
