import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
  scrollBehavior(to, from, saved_position) {
    // Respect the OS 'reduce motion' setting instead of always scrolling smoothly.
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
        // 'auto' follows the CSS scroll-behavior (smooth), so reduced-motion users
        // need 'instant' set explicitly.
        behavior: prefers_reduced_motion ? 'instant' : 'smooth',
      };
    }

    if (to.path != from.path) {
      return {
        left: 0,
        top: 0,
        // Same reason: 'auto' would animate from the old scroll position.
        behavior: 'instant',
      };
    }

    return {
      left: 0,
      top: 0,
      behavior: 'instant',
    };
  },
};
