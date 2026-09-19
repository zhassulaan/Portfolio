import { describe, expect, it } from 'vitest';
import { ru } from '@/data/translations/ru';

// useLocaleText() reads its dictionary from the 'locale_dictionary' useState
// key, which plugins/locale_dictionary.ts populates lazily for the active
// locale (see that file, and the composable's own comment, for why). These
// tests set that shared state directly rather than loading the real plugin
// (which would need a live locale + a dynamic import), so each test can
// control the dictionary content precisely and synchronously.
describe('useLocaleText', () => {
  it('falls back to the given English string when no translation dictionary has the key', async () => {
    const { useLocaleText } = await import('@/composables/use_locale_text');
    const { tx } = useLocaleText();

    expect(tx('this.key.does.not.exist.anywhere', 'Fallback text')).toBe('Fallback text');
  });

  it('returns the locale dictionary value when the key exists', async () => {
    const dictionary = useState<Record<string, string>>('locale_dictionary');
    dictionary.value = ru;

    const { useLocaleText } = await import('@/composables/use_locale_text');
    const { tx } = useLocaleText();

    const [existing_key] = Object.keys(ru);
    expect(existing_key).toBeTruthy();
    expect(tx(existing_key, '__should_not_be_returned__')).toBe(ru[existing_key]);
  });

  it('always returns the fallback when the dictionary is empty, as it is for English (no overlay)', async () => {
    const dictionary = useState<Record<string, string>>('locale_dictionary');
    dictionary.value = {};

    const { useLocaleText } = await import('@/composables/use_locale_text');
    const { tx } = useLocaleText();

    const [existing_ru_key] = Object.keys(ru);
    // Same key exists in the ru dictionary, but the shared state was just
    // reset to empty above (standing in for the 'en' locale, which has no
    // overlay dictionary at all), so it must fall through.
    expect(tx(existing_ru_key, 'English fallback')).toBe('English fallback');
  });
});
