<script setup lang='ts'>
// Generic, reusable dialog overlay — teleported to <body> so it isn't
// clipped or z-index-fought by whatever section renders the trigger.
// Content is fully slot-driven; callers own everything except the
// backdrop/close/focus mechanics handled here.
const props = withDefaults(defineProps<{
  open: boolean;
  title: string;
  close_label: string;
}>(), {
  close_label: 'Close',
});

const emit = defineEmits<{
  (event: 'close'): void;
}>();

const panel = ref<HTMLElement | null>(null);
let last_focused: HTMLElement | null = null;

const close = () => emit('close');

const handle_keydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close();
  }
};

watch(() => props.open, (is_open) => {
  if (is_open) {
    last_focused = (document.activeElement as HTMLElement) ?? null;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handle_keydown);
    nextTick(() => panel.value?.focus());
  } else {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handle_keydown);
    // Return focus to whatever opened the modal (the card's trigger
    // button) rather than leaving it stranded on a removed element.
    last_focused?.focus();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handle_keydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to='body'>
    <Transition name='modal_fade'>
      <div class='modal_overlay'
        v-if='open'
        v-on:mousedown.self='close'>
        <div class='modal'
          ref='panel'
          role='dialog'
          aria-modal='true'
          :aria-label='title'
          tabindex='-1'>
          <div class='modal__header'>
            <h2 v-text='title'></h2>
            <button class='modal__close'
              type='button'
              :aria-label='close_label'
              v-on:click='close'>
              <span aria-hidden='true'>✕</span>
            </button>
          </div>

          <div class='modal__body'>
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style src='./modal.css'></style>
