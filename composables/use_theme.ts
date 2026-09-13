// 'blue' and 'gray' are extra accessibility color schemes (offered from the
// accessibility panel, not the header toggle) — kept on this same composable
// rather than a second parallel state machine, so the header toggle and the
// accessibility panel can never disagree about which scheme is active.
export type ThemePreference = 'light' | 'dark' | 'blue' | 'gray' | 'auto';
export type ResolvedTheme = 'light' | 'dark' | 'blue' | 'gray';

const THEME_STORAGE_KEY = 'zs_theme';
const EXPLICIT_THEMES: ReadonlyArray<ResolvedTheme> = ['light', 'dark', 'blue', 'gray'];

const preference = ref<ThemePreference>('auto');
const resolved = ref<ResolvedTheme>('light');

let media_query: MediaQueryList | null = null;
let is_initialized = false;

const read_stored_preference = (): ThemePreference => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (stored === 'auto' || (EXPLICIT_THEMES as string[]).includes(stored ?? '')) {
      return stored as ThemePreference;
    }
  } catch {
    // localStorage can throw in private/blocked contexts; fall back silently.
  }

  return 'auto';
};

const read_system_theme = (): ResolvedTheme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const apply_resolved_theme = (theme: ResolvedTheme) => {
  resolved.value = theme;
  document.documentElement.setAttribute('data-theme', theme);
};

const set_preference = (next: ThemePreference) => {
  preference.value = next;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Ignore write failures; the preference still applies for this session.
  }

  apply_resolved_theme(next === 'auto' ? read_system_theme() : next);
};

const initialize = () => {
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
    if (preference.value === 'auto') {
      apply_resolved_theme(event.matches ? 'dark' : 'light');
    }
  });
};

export const useTheme = () => {
  initialize();

  return {
    preference,
    resolved,
    set_preference,
  };
};
