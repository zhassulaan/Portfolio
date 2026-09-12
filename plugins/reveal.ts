const reveal_observers = new WeakMap<HTMLElement, IntersectionObserver>();

export default defineNuxtPlugin((nuxt_app) => {
  nuxt_app.vueApp.directive('reveal', {
    getSSRProps() {
      return {};
    },

    mounted(element: HTMLElement) {
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
