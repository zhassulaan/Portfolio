import { locale_dictionaries, type LocaleCode } from '@/data/translations';

// Looks up a translated override for a piece of data-driven content (a
// project description, a case study paragraph, a milestone's focus line,
// …) keyed by a stable id already present in data/portfolio.ts — e.g.
// `projects.geonomix.description` or `case_studies.01.title`.
//
// Falls back to the English string already sitting in data/portfolio.ts
// (passed in as `fallback`) whenever the current locale is English, or a
// translation for that specific key hasn't been added yet — so a missing
// translation degrades to correct English rather than a blank or a raw key.
export function useLocaleText() {
  const { locale } = useI18n();

  const tx = (key: string, fallback: string): string => {
    const dictionary = locale_dictionaries[locale.value as LocaleCode];

    return dictionary?.[key] ?? fallback;
  };

  return { tx };
}
