// Codes come from config/locales.json.
export type LocaleCode = string;

// Returns the translation for a piece of content, e.g. `projects.geonomix.description`
// or `case_studies.01.title`. Falls back to the English text from
// data/portfolio.ts when the language has no translation for that key.
// The dictionary is loaded by plugins/locale_dictionary.ts.
export function useLocaleText() {
  const dictionary = useState<Record<string, string>>('locale_dictionary', () => ({}));

  function tx(key: string, fallback: string): string {
    return dictionary.value[key] ?? fallback;
  }

  return { tx };
}
