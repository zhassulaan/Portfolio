import { beforeEach, describe, expect, it } from 'vitest';
import { storeToRefs } from 'pinia';
import { useAccessibilityStore } from '@/stores/accessibility';

describe('useAccessibilityStore', () => {
  beforeEach(() => {
    // font_size/image_mode live in a Pinia store singleton (shared across
    // the whole app on purpose, so every panel/reader agrees on one state)
    // — reset the DOM + storage between tests so they don't leak into each
    // other.
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-a11y-font-size');
    document.documentElement.removeAttribute('data-a11y-images');
    useAccessibilityStore().reset_all();
  });

  it('defaults to medium font size and visible images', () => {
    const { font_size, image_mode } = storeToRefs(useAccessibilityStore());
    expect(font_size.value).toBe('medium');
    expect(image_mode.value).toBe('show');
  });

  it('updates font size and mirrors it onto the document element', () => {
    const store = useAccessibilityStore();
    const { font_size } = storeToRefs(store);
    store.set_font_size('large');

    expect(font_size.value).toBe('large');
    expect(document.documentElement.getAttribute('data-a11y-font-size')).toBe('large');
  });

  it('updates image mode and mirrors it onto the document element', () => {
    const store = useAccessibilityStore();
    const { image_mode } = storeToRefs(store);
    store.set_image_mode('grayscale');

    expect(image_mode.value).toBe('grayscale');
    expect(document.documentElement.getAttribute('data-a11y-images')).toBe('grayscale');
  });

  it('persists font size and image mode to localStorage, but never text-to-speech', () => {
    const { set_font_size, set_image_mode } = useAccessibilityStore();
    set_font_size('small');
    set_image_mode('hide');

    const stored = JSON.parse(window.localStorage.getItem('zs_a11y_settings') ?? '{}');
    expect(stored.font_size).toBe('small');
    expect(stored.image_mode).toBe('hide');
    expect(stored.text_to_speech).toBeUndefined();
  });

  it('reset_all restores defaults and clears storage', () => {
    const store = useAccessibilityStore();
    const { font_size, image_mode } = storeToRefs(store);
    store.set_font_size('large');
    store.set_image_mode('hide');

    store.reset_all();

    expect(font_size.value).toBe('medium');
    expect(image_mode.value).toBe('show');
    expect(window.localStorage.getItem('zs_a11y_settings')).toBeNull();
  });
});
