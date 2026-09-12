export default defineNuxtPlugin((nuxt_app) => {
  nuxt_app.vueApp.directive('tilt', {
    getSSRProps() {
      return {};
    },

    mounted(element: HTMLElement) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const max_rotation = 7;

      const update_tilt = (event: PointerEvent) => {
        const bounds = element.getBoundingClientRect();
        const relative_x = (event.clientX - bounds.left) / bounds.width;
        const relative_y = (event.clientY - bounds.top) / bounds.height;
        const rotate_y = (relative_x - .5) * max_rotation * 2;
        const rotate_x = (.5 - relative_y) * max_rotation * 2;

        element.style.setProperty('--tilt_rotate_x', `${rotate_x.toFixed(2)}deg`);
        element.style.setProperty('--tilt_rotate_y', `${rotate_y.toFixed(2)}deg`);
        element.style.setProperty('--spotlight_x', `${(relative_x * 100).toFixed(1)}%`);
        element.style.setProperty('--spotlight_y', `${(relative_y * 100).toFixed(1)}%`);
      };

      const reset_tilt = () => {
        element.style.setProperty('--tilt_rotate_x', '0deg');
        element.style.setProperty('--tilt_rotate_y', '0deg');
        element.style.setProperty('--spotlight_x', '50%');
        element.style.setProperty('--spotlight_y', '50%');
      };

      element.addEventListener('pointermove', update_tilt);
      element.addEventListener('pointerleave', reset_tilt);
      reset_tilt();
    },
  });
});
