<script setup lang='ts'>
import { useTheme, type ThemePreference } from '@/composables/use_theme';
import { useAccessibility, type FontSize, type ImageMode } from '@/composables/use_accessibility';

const { t } = useI18n();
const { preference, set_preference } = useTheme();
const {
  font_size,
  image_mode,
  text_to_speech,
  speech_supported,
  set_font_size,
  set_image_mode,
  set_text_to_speech,
  stop_speaking,
  reset_all,
} = useAccessibility();

const is_open = ref(false);
const toggle_button = ref<HTMLButtonElement | null>(null);
const panel = ref<HTMLElement | null>(null);
const route = useRoute();

const color_schemes: Array<{ value: ThemePreference; label: string; sample: string }> = [{
  value: 'light',
  label: 'scheme_normal',
  sample: 'Ц',
}, {
  value: 'dark',
  label: 'scheme_dark',
  sample: 'Ц',
}, {
  value: 'blue',
  label: 'scheme_blue',
  sample: 'Ц',
}, {
  value: 'gray',
  label: 'scheme_gray',
  sample: 'Ц',
}];

const font_sizes: Array<{ value: FontSize; label: string }> = [{
  value: 'small',
  label: 'font_small',
}, {
  value: 'medium',
  label: 'font_medium',
}, {
  value: 'large',
  label: 'font_large',
}];

const image_modes: Array<{ value: ImageMode; label: string; icon: string }> = [{
  value: 'show',
  label: 'image_show',
  icon: '🖼',
}, {
  value: 'grayscale',
  label: 'image_grayscale',
  icon: '◐',
}, {
  value: 'hide',
  label: 'image_hide',
  icon: '🚫',
}];

const open_panel = () => {
  is_open.value = true;

  nextTick(() => {
    panel.value?.focus();
  });
};

const close_panel = () => {
  if (!is_open.value) {
    return;
  }

  is_open.value = false;
  toggle_button.value?.focus();
};

const toggle_panel = () => {
  if (is_open.value) {
    close_panel();
  } else {
    open_panel();
  }
};

const handle_keydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && is_open.value) {
    close_panel();
  }
};

const handle_click_outside = (event: MouseEvent) => {
  if (!is_open.value) {
    return;
  }

  const target = event.target as Node;

  if (panel.value?.contains(target) || toggle_button.value?.contains(target)) {
    return;
  }

  close_panel();
};

const handle_reset = () => {
  set_preference('light');
  reset_all();
};

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
      ref='toggle_button'
      type='button'
      :aria-expanded='is_open'
      aria-controls='accessibility_panel'
      :aria-label="$t('accessibility.toggle_aria')"
      :title="$t('accessibility.toggle_aria')"
      v-on:click='toggle_panel'>
      <span aria-hidden='true'>♿</span>
    </button>

    <div class='accessibility_panel'
      :class="{ 'accessibility_panel--open': is_open }"
      ref='panel'
      id='accessibility_panel'
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

      <fieldset class='accessibility_panel__section'>
        <legend>{{ $t('accessibility.color_scheme_legend') }}</legend>
        <div class='accessibility_panel__options' role='group' :aria-label="$t('accessibility.color_scheme_legend')">
          <button class='accessibility_panel__option accessibility_panel__option--scheme'
            :class="[
              `accessibility_panel__option--${scheme.value}`,
              { 'accessibility_panel__option--active': preference === scheme.value },
            ]"
            v-for='scheme in color_schemes'
            :key='scheme.value'
            type='button'
            :aria-pressed="preference === scheme.value"
            v-on:click='set_preference(scheme.value)'>
            <span class='accessibility_panel__sample' aria-hidden='true' v-text='scheme.sample'></span>
            <span>{{ $t('accessibility.' + scheme.label) }}</span>
          </button>
        </div>
      </fieldset>

      <fieldset class='accessibility_panel__section'>
        <legend>{{ $t('accessibility.font_size_legend') }}</legend>
        <div class='accessibility_panel__options' role='group' :aria-label="$t('accessibility.font_size_legend')">
          <button class='accessibility_panel__option'
            :class="[
              `accessibility_panel__option--font_${size.value}`,
              { 'accessibility_panel__option--active': font_size === size.value },
            ]"
            v-for='size in font_sizes'
            :key='size.value'
            type='button'
            :aria-pressed="font_size === size.value"
            v-on:click='set_font_size(size.value)'>
            <span class='accessibility_panel__sample' aria-hidden='true'>A</span>
            <span>{{ $t('accessibility.' + size.label) }}</span>
          </button>
        </div>
      </fieldset>

      <fieldset class='accessibility_panel__section'>
        <legend>{{ $t('accessibility.images_legend') }}</legend>
        <div class='accessibility_panel__options' role='group' :aria-label="$t('accessibility.images_legend')">
          <button class='accessibility_panel__option'
            :class="{ 'accessibility_panel__option--active': image_mode === mode.value }"
            v-for='mode in image_modes'
            :key='mode.value'
            type='button'
            :aria-pressed="image_mode === mode.value"
            v-on:click='set_image_mode(mode.value)'>
            <span class='accessibility_panel__sample' aria-hidden='true' v-text='mode.icon'></span>
            <span>{{ $t('accessibility.' + mode.label) }}</span>
          </button>
        </div>
      </fieldset>

      <fieldset class='accessibility_panel__section' v-if='speech_supported'>
        <legend>{{ $t('accessibility.tts_legend') }}</legend>
        <div class='accessibility_panel__options' role='group' :aria-label="$t('accessibility.tts_legend')">
          <button class='accessibility_panel__option'
            :class="{ 'accessibility_panel__option--active': !text_to_speech }"
            type='button'
            :aria-pressed='!text_to_speech'
            v-on:click='set_text_to_speech(false)'>
            <span class='accessibility_panel__sample' aria-hidden='true'>🔇</span>
            <span>{{ $t('accessibility.tts_off') }}</span>
          </button>
          <button class='accessibility_panel__option'
            :class="{ 'accessibility_panel__option--active': text_to_speech }"
            type='button'
            :aria-pressed='text_to_speech'
            v-on:click='set_text_to_speech(true)'>
            <span class='accessibility_panel__sample' aria-hidden='true'>🔊</span>
            <span>{{ $t('accessibility.tts_on') }}</span>
          </button>
        </div>
        <p class='accessibility_panel__hint'>{{ $t('accessibility.tts_hint') }}</p>
      </fieldset>
    </div>
  </div>
</template>

<style src='./accessibility_panel.css'></style>
