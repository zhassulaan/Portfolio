import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
  scrollBehavior(to, from, saved_position) {
    // Respect the OS-level 'reduce motion' preference (vestibular disorders,
    // motion sensitivity) instead of always forcing a smooth animated scroll.
    const prefers_reduced_motion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (saved_position) {
      return saved_position;
    }

    if (to.hash) {
      return {
        el: to.hash,
        top: 112,
        behavior: prefers_reduced_motion ? 'auto' : 'smooth',
      };
    }

    if (to.path !== from.path) {
      return {
        left: 0,
        top: 0,
        behavior: 'auto',
      };
    }

    return {
      left: 0,
      top: 0,
      behavior: 'auto',
    };
  },
};
