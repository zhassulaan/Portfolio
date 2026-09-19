export type LocaleCode = 'en' | 'ru' | 'kk' | 'tr' | 'zh' | 'nl' | 'de';

// Looks up a translated override for a piece of data-driven content (a
// project description, a case study paragraph, a milestone's focus line,
// …) keyed by a stable id already present in data/portfolio.ts — e.g.
// `projects.geonomix.description` or `case_studies.01.title`.
//
// Falls back to the English string already sitting in data/portfolio.ts
// (passed in as `fallback`) whenever the current locale is English, or a
// translation for that specific key hasn't been added yet — so a missing
// translation degrades to correct English rather than a blank or a raw key.
//
// The actual per-locale dictionary is loaded lazily by
// plugins/locale_dictionary.ts (only the active locale's file is fetched —
// previously all 6 non-English dictionaries were statically imported here
// and shipped to every visitor regardless of locale, ~135KB of dead weight
// for the ~86% of visitors on the English default) and shared here via
// useState, so this composable itself stays a plain synchronous read with
// no call-site changes needed anywhere tx() is used.
export function useLocaleText() {
  const dictionary = useState<Record<string, string>>('locale_dictionary', () => ({}));

  function tx(key: string, fallback: string): string {
    return dictionary.value[key] ?? fallback;
  }

  return { tx };
}
