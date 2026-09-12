export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  css: [
    '@/assets/css/base.css',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        }, {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        }, {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap',
        }, {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ],
      // Resolves and applies the theme before first paint so switching
      // between light/dark/auto never causes a flash of the wrong theme.
      script: [
        {
          key: 'theme-init',
          innerHTML: `(function () {
            try {
              var stored = window.localStorage.getItem('zs_theme');
              var preference = (stored === 'light' || stored === 'dark' || stored === 'auto') ? stored : 'auto';
              var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              var resolved = preference === 'auto' ? (prefersDark ? 'dark' : 'light') : preference;
              document.documentElement.setAttribute('data-theme', resolved);
            } catch (error) {
              document.documentElement.setAttribute('data-theme', 'light');
            }
          })();`,
          tagPosition: 'head',
        },
      ],
    },
  },
});
