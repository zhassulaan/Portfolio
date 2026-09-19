import { defineStore } from 'pinia';

export type ThemePreference = 'light' | 'dark' | 'blue' | 'gray' | 'auto';
export type ResolvedTheme = 'light' | 'dark' | 'blue' | 'gray';

const THEME_STORAGE_KEY = 'zs_theme';
const EXPLICIT_THEMES: ReadonlyArray<ResolvedTheme> = ['light', 'dark', 'blue', 'gray'];

function read_stored_preference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (stored == 'auto' || (EXPLICIT_THEMES as string[]).includes(stored ?? '')) {
      return stored as ThemePreference;
    }
  } catch (error) {
    // localStorage can throw in private/blocked contexts; fall back silently.
    console.warn('Could not read the stored theme preference:', error);
  }

  return 'auto';
}

const read_system_theme = (): ResolvedTheme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// A Pinia store is a single module-level instance by default (the store id
// 'theme' is a singleton unless something explicitly asks for a different
// instance), so every consumer of useThemeStore() shares one global theme
// state across the whole app.
export const useThemeStore = defineStore('theme', () => {
  const preference = ref<ThemePreference>('auto');
  const resolved = ref<ResolvedTheme>('light');

  let media_query: MediaQueryList | null = null;
  let is_initialized = false;

  function apply_resolved_theme(theme: ResolvedTheme) {
    resolved.value = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }

  function set_preference(next: ThemePreference) {
    preference.value = next;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch (error) {
      // Ignore write failures; the preference still applies for this session.
      console.warn('Could not persist the theme preference:', error);
    }

    apply_resolved_theme(next == 'auto' ? read_system_theme() : next);
  }

  function initialize() {
    if (is_initialized || typeof window === 'undefined') {
      return;
    }

    is_initialized = true;
    preference.value = read_stored_preference();

    // The blocking inline script in nuxt.config.ts already set data-theme
    // before hydration; trust it instead of recomputing to avoid a mismatch.
    const applied_attribute = document.documentElement.getAttribute('data-theme');
    resolved.value = (EXPLICIT_THEMES as string[]).includes(applied_attribute ?? '')
      ? (applied_attribute as ResolvedTheme)
      : 'light';

    media_query = window.matchMedia('(prefers-color-scheme: dark)');
    media_query.addEventListener('change', (event) => {
      if (preference.value == 'auto') {
        apply_resolved_theme(event.matches ? 'dark' : 'light');
      }
    });
  }

  initialize();

  return {
    preference,
    resolved,
    set_preference,
  };
});
