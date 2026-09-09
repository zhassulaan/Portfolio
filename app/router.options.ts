import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
  scrollBehavior(to, from, saved_position) {
    if (saved_position) {
      return saved_position;
    }

    if (to.hash) {
      return {
        el: to.hash,
        top: 112,
        behavior: 'smooth',
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
