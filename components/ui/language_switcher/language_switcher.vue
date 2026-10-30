<script setup lang='ts'>
const { locale, locales } = useI18n();
const switch_locale_path = useSwitchLocalePath();

// Show the search box once there are more languages than this.
const SEARCH_THRESHOLD = 8;

const is_open = ref(false);
const root = ref<HTMLElement | null>(null);
const search_query = ref('');

const all_locales = computed(() =>
  (locales.value as Array<{ code: string; name?: string }>),
);

const show_search = computed(() => all_locales.value.length > SEARCH_THRESHOLD);

const available_locales = computed(() => {
  const query = search_query.value.trim().toLowerCase();

  if (!query) {
    return all_locales.value;
  }

  return all_locales.value.filter((item) =>
    item.code.toLowerCase().includes(query) || (item.name ?? '').toLowerCase().includes(query),
  );
});

function toggle_open() {
  is_open.value = !is_open.value;
}

function close() {
  is_open.value = false;
  search_query.value = '';
}

function handle_click_outside(event: MouseEvent) {
  if (!is_open.value) {
    return;
  }

  if (!root.value?.contains(event.target as Node)) {
    close();
  }
}

function handle_keydown(event: KeyboardEvent) {
  if (event.key == 'Escape' && is_open.value) {
    close();
  }
}

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

    <div class='language_switcher__menu' v-if='is_open'>
      <input class='language_switcher__search'
        v-if='show_search'
        type='search'
        :aria-label="$t('header.language_search')"
        autocomplete='off'
        :placeholder="$t('header.language_search')"
        v-model='search_query'>

      <ul class='language_switcher__list'
        role='listbox'
        :aria-label="$t('header.language')">
        <li v-for='item in available_locales' :key='item.code'>
          <NuxtLink class='language_switcher__option'
            :class="{ 'language_switcher__option--active': item.code == locale }"
            :to='switch_locale_path(item.code)'
            role='option'
            :aria-selected='item.code == locale'
            v-on:click='close'>
            {{ item.name }}
          </NuxtLink>
        </li>
        <li class='language_switcher__empty' v-if='!available_locales.length'>
          {{ $t('header.language_no_results') }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style src='./language_switcher.css'></style>
