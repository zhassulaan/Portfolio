import { describe, expect, it } from 'vitest';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { ru } from '@/data/translations/ru';

// useLocaleText() reads the active locale off useI18n() — mock it so this
// test controls the locale directly instead of depending on whatever the
// app's default locale happens to be.
const current_locale = { value: 'ru' };
mockNuxtImport('useI18n', () => {
  return () => ({ locale: current_locale });
});

describe('useLocaleText', () => {
  it('falls back to the given English string when no translation dictionary has the key', async () => {
    const { useLocaleText } = await import('@/composables/use_locale_text');
    const { tx } = useLocaleText();

    expect(tx('this.key.does.not.exist.anywhere', 'Fallback text')).toBe('Fallback text');
  });

  it('returns the locale dictionary value when the key exists', async () => {
    const { useLocaleText } = await import('@/composables/use_locale_text');
    const { tx } = useLocaleText();

    const [existing_key] = Object.keys(ru);
    expect(existing_key).toBeTruthy();
    expect(tx(existing_key, '__should_not_be_returned__')).toBe(ru[existing_key]);
  });

  it('always returns the fallback for English, which has no overlay dictionary', async () => {
    current_locale.value = 'en';
    const { useLocaleText } = await import('@/composables/use_locale_text');
    const { tx } = useLocaleText();

    const [existing_ru_key] = Object.keys(ru);
    // Same key exists in the ru dictionary, but the active locale is 'en',
    // which isn't in locale_dictionaries at all, so it must fall through.
    expect(tx(existing_ru_key, 'English fallback')).toBe('English fallback');

    current_locale.value = 'ru';
  });
});
