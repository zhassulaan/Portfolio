export type FontSize = 'small' | 'medium' | 'large';
export type ImageMode = 'show' | 'grayscale' | 'hide';

const STORAGE_KEY = 'zs_a11y_settings';

const font_size = ref<FontSize>('medium');
const image_mode = ref<ImageMode>('show');
const text_to_speech = ref(false);
// Whether speech synthesis is available at all. This starts `false` (matching
// SSR, where `window` doesn't exist) and only flips to `true` once we've
// actually checked on the client — as a plain `typeof window !== 'undefined'`
// function called directly from the template, this would return different
// results on the server and the client and Vue would hydrate with a
// mismatched DOM (the text-to-speech section present on the client but
// missing from the server-rendered HTML).
const speech_supported = ref(false);

let is_initialized = false;
let keep_alive_timer: ReturnType<typeof setInterval> | null = null;

interface StoredSettings {
  font_size?: FontSize;
  image_mode?: ImageMode;
}

const is_font_size = (value: unknown): value is FontSize =>
  value === 'small' || value === 'medium' || value === 'large';

const is_image_mode = (value: unknown): value is ImageMode =>
  value === 'show' || value === 'grayscale' || value === 'hide';

// Text-to-speech is intentionally never persisted — a visitor who enabled it
// on one visit almost certainly doesn't want the page to start talking on
// its own, silently, on every future visit.
const read_stored_settings = (): StoredSettings => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as StoredSettings;

    return {
      font_size: is_font_size(parsed.font_size) ? parsed.font_size : undefined,
      image_mode: is_image_mode(parsed.image_mode) ? parsed.image_mode : undefined,
    };
  } catch {
    // Corrupt JSON or blocked storage — fall back to defaults silently.
    return {};
  }
};

const persist = () => {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        font_size: font_size.value,
        image_mode: image_mode.value,
      }),
    );
  } catch {
    // Ignore write failures; the settings still apply for this session.
  }
};

const apply_font_size = (value: FontSize) => {
  font_size.value = value;
  document.documentElement.setAttribute('data-a11y-font-size', value);
};

const apply_image_mode = (value: ImageMode) => {
  image_mode.value = value;
  document.documentElement.setAttribute('data-a11y-images', value);
};

const clear_keep_alive = () => {
  if (keep_alive_timer !== null) {
    clearInterval(keep_alive_timer);
    keep_alive_timer = null;
  }
};

const stop_speaking = () => {
  clear_keep_alive();

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

const speak_main_content = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  const main = document.getElementById('main_content') ?? document.body;
  const text = main.innerText.trim();

  window.speechSynthesis.cancel();
  clear_keep_alive();

  if (!text) {
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.addEventListener('end', clear_keep_alive);
  utterance.addEventListener('error', clear_keep_alive);

  window.speechSynthesis.speak(utterance);

  // Chrome silently stops speaking after ~15 seconds on longer utterances
  // (a long-standing bug, not a setting) unless the utterance is paused and
  // resumed periodically. A whole page's main content easily runs past that,
  // so without this a visitor who turns speech on would hear it cut off
  // partway through and look broken.
  keep_alive_timer = setInterval(() => {
    if (!window.speechSynthesis.speaking) {
      clear_keep_alive();
      return;
    }

    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
  }, 10000);
};

const set_font_size = (value: FontSize) => {
  apply_font_size(value);
  persist();
};

const set_image_mode = (value: ImageMode) => {
  apply_image_mode(value);
  persist();
};

const set_text_to_speech = (enabled: boolean) => {
  text_to_speech.value = enabled;

  if (enabled) {
    speak_main_content();
  } else {
    stop_speaking();
  }
};

const reset_all = () => {
  apply_font_size('medium');
  apply_image_mode('show');
  set_text_to_speech(false);

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore — defaults are already applied for this session.
  }
};

const initialize = () => {
  if (is_initialized || typeof window === 'undefined') {
    return;
  }

  is_initialized = true;

  const stored = read_stored_settings();

  apply_font_size(stored.font_size ?? 'medium');
  apply_image_mode(stored.image_mode ?? 'show');
  speech_supported.value = 'speechSynthesis' in window;
};

export const useAccessibility = () => {
  initialize();

  return {
    font_size,
    image_mode,
    text_to_speech,
    speech_supported,
    set_font_size,
    set_image_mode,
    set_text_to_speech,
    stop_speaking,
    reset_all,
  };
};
