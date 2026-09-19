import type { LocaleCode } from '@/composables/use_locale_text';

// Loads the data-driven-content translation overlay (see
// composables/use_locale_text.ts) for the active locale only, instead of
// bundling all 6 non-English languages into every page load. Each import()
// below is a static, analyzable call, so Vite code-splits every locale's
// dictionary into its own lazy chunk — an English-locale visitor (the
// default, and by far the most common case) never downloads any of this.
//
// Runs as a Nuxt plugin rather than inline in the composable so its async
// setup is awaited by Nuxt on both server and client before the app
// renders — avoiding a flash of English fallback text on a translated
// route while the real dictionary is still loading.
//
// Reads the locale via nuxtApp.$i18n rather than the useI18n() composable:
// useI18n() requires a real Vue component setup() context (it internally
// calls getCurrentInstance()), which a Nuxt plugin is not — calling it here
// throws "Must be called at the top of a setup function" at runtime. The
// $i18n global that @nuxtjs/i18n injects onto nuxtApp carries the same
// reactive `locale` ref without that restriction.
const loaders: Partial<Record<LocaleCode, () => Promise<Record<string, Record<string, string>>>>> = {
  ru: () => import('@/data/translations/ru'),
  kk: () => import('@/data/translations/kk'),
  tr: () => import('@/data/translations/tr'),
  zh: () => import('@/data/translations/zh'),
  nl: () => import('@/data/translations/nl'),
  de: () => import('@/data/translations/de'),
};

export default defineNuxtPlugin(async (nuxt_app) => {
  const i18n = nuxt_app.$i18n as { locale: { value: LocaleCode } };
  const dictionary = useState<Record<string, string>>('locale_dictionary', () => ({}));

  async function load(code: LocaleCode) {
    const loader = loaders[code];
    if (!loader) {
      dictionary.value = {};
      return;
    }
    const loaded_module = await loader();
    dictionary.value = loaded_module[code] ?? {};
  }

  await load(i18n.locale.value);

  watch(() => i18n.locale.value, (code) => {
    load(code);
  });
});
