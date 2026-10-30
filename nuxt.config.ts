import locale_registry from './config/locales.json';

const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://zhassulan.netlify.app';

export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@pinia/nuxt',
  ],
  i18n: {
    // Languages are listed in config/locales.json. Entries with
    // `published: false` are kept out of the site.
    locales: locale_registry
      .filter((entry) => entry.published !== false)
      .map((entry) => ({ ...entry, file: `${entry.code}.json` })),
    // Fallback to English for missing keys is set in i18n.config.ts.
    vueI18n: './i18n.config.ts',
    defaultLocale: 'en',
    baseUrl: SITE_URL,
    langDir: 'locales/',
    restructureDir: false,
    bundle: {
      optimizeTranslationDirective: false,
    },
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    // A few messages (hero.title, cv_page.title, some headings) contain <em> and
    // <br /> and are rendered with v-html. Without this, the message compiler
    // fails the build with "Detected HTML in ... message".
    compilation: {
      strictMessage: false,
    },
  },
  // Browser-visible settings, set via NUXT_PUBLIC_* variables (see .env.example).
  // An empty value turns the feature off.
  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
      contactEmail: 'serikuly.zhassulan@gmail.com',
      // Read at build time (.env locally, environment variables on Netlify).
      bookingUrl: process.env.NUXT_PUBLIC_BOOKING_URL || '',
      analyticsDomain: process.env.NUXT_PUBLIC_ANALYTICS_DOMAIN || '',
      analyticsScriptSrc: process.env.NUXT_PUBLIC_ANALYTICS_SCRIPT_SRC || 'https://plausible.io/js/script.tagged-events.js',
    },
  },
  css: [
    '@/assets/css/theme.css',
    '@/assets/css/base.css',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: 'theme-color',
          content: '#635bff',
        }, {
          name: 'msapplication-TileColor',
          content: '#635bff',
        }, {
          name: 'msapplication-config',
          content: '/browserconfig.xml',
        },
      ],
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
        }, {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        }, {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        }, {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        }, {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#635bff',
        }, {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
      // Sets the theme before first paint so there is no flash of the wrong theme.
      script: [
        {
          key: 'theme-init',
          innerHTML: `(function () {
            try {
              var stored = window.localStorage.getItem('zs_theme');
              var explicit = ['light', 'dark', 'blue', 'gray'];
              var preference = (explicit.indexOf(stored) !== -1 || stored === 'auto') ? stored : 'auto';
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
