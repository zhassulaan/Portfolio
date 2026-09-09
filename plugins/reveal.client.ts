export default defineNuxtPlugin((nuxt_app) => {
  nuxt_app.vueApp.directive('reveal', {
    mounted(element: HTMLElement) {
      element.classList.add('reveal');
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry?.isIntersecting) return;
        element.classList.add('reveal--visible');
        observer.unobserve(element);
      }, { threshold: 0.12 });
      observer.observe(element);
    },
  });
});
