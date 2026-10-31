const reveal_observers = new WeakMap<HTMLElement, IntersectionObserver>();

export default defineNuxtPlugin((nuxt_app) => {
  nuxt_app.vueApp.directive('reveal', {
    getSSRProps() {
      return {};
    },

    // v-reveal='false' skips the animation (content that is already on screen
    // would otherwise wait for hydration before it becomes visible).
    mounted(element: HTMLElement, binding) {
      if (binding.value === false) {
        return;
      }

      element.classList.add('reveal');

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        element.classList.add('reveal--visible');
        return;
      }

      const observer = new IntersectionObserver(([entry]) => {
        if (!entry) {
          return;
        }

        element.classList.toggle('reveal--visible', entry.isIntersecting);
      }, {
        threshold: .1,
        rootMargin: '-4% 0px -4% 0px',
      });

      reveal_observers.set(element, observer);
      observer.observe(element);
    },

    beforeUnmount(element: HTMLElement) {
      reveal_observers.get(element)?.disconnect();
      reveal_observers.delete(element);
    },
  });
});
