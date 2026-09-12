export type FontSize = 'small' | 'medium' | 'large';
export type ImageMode = 'show' | 'grayscale' | 'hide';

const STORAGE_KEY = 'zs_a11y_settings';

const font_size = ref<FontSize>('medium');
const image_mode = ref<ImageMode>('show');
const text_to_speech = ref(false);

let is_initialized = false;

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

const stop_speaking = () => {
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

  if (!text) {
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
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
};

const is_speech_supported = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window;

export const useAccessibility = () => {
  initialize();

  return {
    font_size,
    image_mode,
    text_to_speech,
    set_font_size,
    set_image_mode,
    set_text_to_speech,
    stop_speaking,
    reset_all,
    is_speech_supported,
  };
};
