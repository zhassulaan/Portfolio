// Newer Node versions have an experimental global `localStorage` that hides
// happy-dom's and is unusable without --localstorage-file. Use a small
// in-memory Storage when the real one doesn't work.
function create_memory_storage(): Storage {
  const store = new Map<string, string>();

  return {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key) => store.get(key) ?? null,
    key: (index) => Array.from(store.keys())[index] ?? null,
    removeItem: (key) => {
      store.delete(key);
    },
    setItem: (key, value) => {
      store.set(key, String(value));
    },
  };
}

function is_usable(storage: Storage | undefined): boolean {
  try {
    return !!storage && typeof storage.clear == 'function';
  } catch {
    return false;
  }
}

let current: Storage | undefined;

try {
  current = typeof window == 'undefined' ? undefined : window.localStorage;
} catch {
  current = undefined;
}

// Files running with `@vitest-environment node` have no window.
if (typeof window != 'undefined' && !is_usable(current)) {
  Object.defineProperty(window, 'localStorage', {
    value: create_memory_storage(),
    configurable: true,
  });
}
