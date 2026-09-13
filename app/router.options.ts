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
        // 'auto' defers to the CSS `scroll-behavior` on <html> (which we set
        // to 'smooth' for the anchor-link experience), so a truly instant
        // jump for reduced-motion users has to be requested explicitly.
        behavior: prefers_reduced_motion ? 'instant' : 'smooth',
      };
    }

    if (to.path !== from.path) {
      return {
        left: 0,
        top: 0,
        // Same trap: 'auto' would inherit the smooth CSS scroll-behavior and
        // visibly animate from the old scroll position, which is exactly the
        // 'lands in the middle, then scrolls up' glitch this avoids.
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
