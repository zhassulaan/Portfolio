<script setup lang='ts'>
import { useThemeStore, type ThemePreference } from '@/stores/theme';
import { useAccessibilityStore, type FontSize, type ImageMode } from '@/stores/accessibility';
import AccessibilityOptionGroup from '@/components/ui/accessibility_option_group/accessibility_option_group.vue';

const { t } = useI18n();
const theme_store = useThemeStore();
const { preference } = storeToRefs(theme_store);
const { set_preference } = theme_store;

const accessibility_store = useAccessibilityStore();
const { font_size, image_mode, text_to_speech, speech_supported } = storeToRefs(accessibility_store);
const { set_font_size, set_image_mode, set_text_to_speech, stop_speaking, reset_all } = accessibility_store;

const is_open = ref(false);
const toggle_button = ref<HTMLButtonElement | null>(null);
const panel = ref<HTMLElement | null>(null);
const route = useRoute();

// Each group is a computed (not a plain array) so the labels stay reactive
// to locale switches — plain arrays built once at setup wouldn't re-run
// t() when the language changes.
const color_scheme_options = computed(() => ([
  { value: 'light', label: t('accessibility.scheme_normal'), sample: 'Ц', extra_class: 'accessibility_option_group__option--scheme accessibility_option_group__option--light' },
  { value: 'dark', label: t('accessibility.scheme_dark'), sample: 'Ц', extra_class: 'accessibility_option_group__option--scheme accessibility_option_group__option--dark' },
  { value: 'blue', label: t('accessibility.scheme_blue'), sample: 'Ц', extra_class: 'accessibility_option_group__option--scheme accessibility_option_group__option--blue' },
  { value: 'gray', label: t('accessibility.scheme_gray'), sample: 'Ц', extra_class: 'accessibility_option_group__option--scheme accessibility_option_group__option--gray' },
]));

const font_size_options = computed(() => ([
  { value: 'small', label: t('accessibility.font_small'), sample: 'A', extra_class: 'accessibility_option_group__option--font_small' },
  { value: 'medium', label: t('accessibility.font_medium'), sample: 'A', extra_class: 'accessibility_option_group__option--font_medium' },
  { value: 'large', label: t('accessibility.font_large'), sample: 'A', extra_class: 'accessibility_option_group__option--font_large' },
]));

const image_mode_options = computed(() => ([
  { value: 'show', label: t('accessibility.image_show'), sample: '🖼' },
  { value: 'grayscale', label: t('accessibility.image_grayscale'), sample: '◐' },
  { value: 'hide', label: t('accessibility.image_hide'), sample: '🚫' },
]));

const tts_options = computed(() => ([
  { value: false, label: t('accessibility.tts_off'), sample: '🔇' },
  { value: true, label: t('accessibility.tts_on'), sample: '🔊' },
]));

function handle_scheme_select(value: string | boolean) {
  set_preference(value as ThemePreference);
}

function handle_font_size_select(value: string | boolean) {
  set_font_size(value as FontSize);
}

function handle_image_mode_select(value: string | boolean) {
  set_image_mode(value as ImageMode);
}

function handle_tts_select(value: string | boolean) {
  set_text_to_speech(value as boolean);
}

function open_panel() {
  is_open.value = true;

  nextTick(() => {
    panel.value?.focus();
  });
}

function close_panel() {
  if (!is_open.value) {
    return;
  }

  is_open.value = false;
  toggle_button.value?.focus();
}

function toggle_panel() {
  if (is_open.value) {
    close_panel();
  } else {
    open_panel();
  }
}

function handle_keydown(event: KeyboardEvent) {
  if (event.key == 'Escape' && is_open.value) {
    close_panel();
  }
}

function handle_click_outside(event: MouseEvent) {
  if (!is_open.value) {
    return;
  }

  const target = event.target as Node;

  if (panel.value?.contains(target) || toggle_button.value?.contains(target)) {
    return;
  }

  close_panel();
}

function handle_reset() {
  set_preference('light');
  reset_all();
}

onMounted(() => {
  window.addEventListener('keydown', handle_keydown);
  window.addEventListener('click', handle_click_outside);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handle_keydown);
  window.removeEventListener('click', handle_click_outside);
  stop_speaking();
});

// Stop any reading in progress, and close the panel, whenever the route
// changes — otherwise speech from the previous page keeps talking over the
// new one and the panel would sit open across navigations.
watch(
  () => route.fullPath,
  () => {
    close_panel();

    if (text_to_speech.value) {
      set_text_to_speech(false);
    }
  },
);
</script>

<template>
  <div class='accessibility_panel_root'>
    <button class='accessibility_panel__toggle'
      :title="$t('accessibility.toggle_aria')"
      ref='toggle_button'
      type='button'
      :aria-expanded='is_open'
      aria-controls='accessibility_panel'
      :aria-label="$t('accessibility.toggle_aria')"
      v-on:click='toggle_panel'>
      <span aria-hidden='true'>♿</span>
    </button>

    <div class='accessibility_panel'
      :class="{ 'accessibility_panel--open': is_open }"
      id='accessibility_panel'
      ref='panel'
      role='dialog'
      aria-modal='true'
      :aria-label="$t('accessibility.toggle_aria')"
      tabindex='-1'>
      <div class='accessibility_panel__header'>
        <h2>{{ $t('accessibility.heading') }}</h2>
        <div class='accessibility_panel__header_actions'>
          <button class='accessibility_panel__reset'
            type='button'
            v-on:click='handle_reset'>
            {{ $t('accessibility.reset') }}
          </button>
          <button class='accessibility_panel__close'
            type='button'
            :aria-label="$t('accessibility.close_aria')"
            v-on:click='close_panel'>
            <span aria-hidden='true'>✕</span>
          </button>
        </div>
      </div>

      <AccessibilityOptionGroup :legend="$t('accessibility.color_scheme_legend')"
        :aria_label="$t('accessibility.color_scheme_legend')"
        :options='color_scheme_options'
        :active='preference'
        v-on:select='handle_scheme_select' />

      <AccessibilityOptionGroup :legend="$t('accessibility.font_size_legend')"
        :aria_label="$t('accessibility.font_size_legend')"
        :options='font_size_options'
        :active='font_size'
        v-on:select='handle_font_size_select' />

      <AccessibilityOptionGroup :legend="$t('accessibility.images_legend')"
        :aria_label="$t('accessibility.images_legend')"
        :options='image_mode_options'
        :active='image_mode'
        v-on:select='handle_image_mode_select' />

      <AccessibilityOptionGroup v-if='speech_supported'
        :legend="$t('accessibility.tts_legend')"
        :aria_label="$t('accessibility.tts_legend')"
        :options='tts_options'
        :active='text_to_speech'
        :hint="$t('accessibility.tts_hint')"
        v-on:select='handle_tts_select' />
    </div>
  </div>
</template>

<style src='./accessibility_panel.css'></style>
