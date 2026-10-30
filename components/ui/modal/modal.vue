<script setup lang='ts'>
// Generic dialog, teleported to <body> so no section clips it. The content comes
// from the slot; this component handles backdrop, close and focus.
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

function handle_keydown(event: KeyboardEvent) {
  if (event.key == 'Escape') {
    close();
  }
}

watch(() => props.open, (is_open) => {
  if (is_open) {
    last_focused = (document.activeElement as HTMLElement) ?? null;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handle_keydown);
    nextTick(() => panel.value?.focus());
  } else {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handle_keydown);
    // Give focus back to the element that opened the modal.
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
