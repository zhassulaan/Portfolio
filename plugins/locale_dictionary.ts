import type { LocaleCode } from '@/composables/use_locale_text';

// Loads the translation overlay (see composables/use_locale_text.ts) for the
// active locale only, as one lazy chunk per language. Finds every
// data/translations/<code>.ts at build time; a language without a file falls
// back to English.
//
// This is a plugin so Nuxt waits for the dictionary before rendering, which
// avoids a flash of English. It reads $i18n from nuxtApp because useI18n()
// only works inside a component's setup().
const loaders = import.meta.glob<Record<string, unknown>>('../data/translations/*.ts');

function find_loader(code: LocaleCode) {
  return loaders[`../data/translations/${code}.ts`];
}

export default defineNuxtPlugin(async (nuxt_app) => {
  const i18n = nuxt_app.$i18n as { locale: { value: LocaleCode } };
  const dictionary = useState<Record<string, string>>('locale_dictionary', () => ({}));

  async function load(code: LocaleCode) {
    const loader = find_loader(code);
    if (!loader) {
      dictionary.value = {};
      return;
    }
    // New files use `export default`; older ones export a named constant.
    const loaded_module = await loader();
    dictionary.value = (loaded_module.default ?? loaded_module[code] ?? {}) as Record<string, string>;
  }

  await load(i18n.locale.value);

  watch(() => i18n.locale.value, (code) => {
    load(code);
  });
});
