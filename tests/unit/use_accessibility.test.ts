import { beforeEach, describe, expect, it } from 'vitest';
import { useAccessibility } from '@/composables/use_accessibility';

describe('useAccessibility', () => {
  beforeEach(() => {
    // font_size/image_mode are module-level singletons (shared across the
    // whole app on purpose, so every panel/reader agrees on one state) —
    // reset the DOM + storage between tests so they don't leak into each
    // other.
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-a11y-font-size');
    document.documentElement.removeAttribute('data-a11y-images');
    useAccessibility().reset_all();
  });

  it('defaults to medium font size and visible images', () => {
    const { font_size, image_mode } = useAccessibility();
    expect(font_size.value).toBe('medium');
    expect(image_mode.value).toBe('show');
  });

  it('updates font size and mirrors it onto the document element', () => {
    const { set_font_size, font_size } = useAccessibility();
    set_font_size('large');

    expect(font_size.value).toBe('large');
    expect(document.documentElement.getAttribute('data-a11y-font-size')).toBe('large');
  });

  it('updates image mode and mirrors it onto the document element', () => {
    const { set_image_mode, image_mode } = useAccessibility();
    set_image_mode('grayscale');

    expect(image_mode.value).toBe('grayscale');
    expect(document.documentElement.getAttribute('data-a11y-images')).toBe('grayscale');
  });

  it('persists font size and image mode to localStorage, but never text-to-speech', () => {
    const { set_font_size, set_image_mode } = useAccessibility();
    set_font_size('small');
    set_image_mode('hide');

    const stored = JSON.parse(window.localStorage.getItem('zs_a11y_settings') ?? '{}');
    expect(stored.font_size).toBe('small');
    expect(stored.image_mode).toBe('hide');
    expect(stored.text_to_speech).toBeUndefined();
  });

  it('reset_all restores defaults and clears storage', () => {
    const { set_font_size, set_image_mode, reset_all, font_size, image_mode } = useAccessibility();
    set_font_size('large');
    set_image_mode('hide');

    reset_all();

    expect(font_size.value).toBe('medium');
    expect(image_mode.value).toBe('show');
    expect(window.localStorage.getItem('zs_a11y_settings')).toBeNull();
  });
});
