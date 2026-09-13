export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [{
      code: 'en',
      iso: 'en-US',
      name: 'English',
      file: 'en.json',
    }, {
      code: 'ru',
      iso: 'ru-RU',
      name: 'Русский',
      file: 'ru.json',
    }, {
      code: 'kk',
      iso: 'kk-KZ',
      name: 'Қазақша',
      file: 'kk.json',
    }, {
      code: 'tr',
      iso: 'tr-TR',
      name: 'Türkçe',
      file: 'tr.json',
    }, {
      code: 'zh',
      iso: 'zh-CN',
      name: '中文',
      file: 'zh.json',
      }, {
        code: 'nl',
        iso: 'nl-NL',
        name: 'Nederlands',
        file: 'nl.json',
      }, {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de.json',
    }],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    // A few messages (hero.title, several section headings, cv_page.title)
    // deliberately contain `<em>`/`<br />` and are rendered with v-html so
    // that emphasis/line-breaks can move per language. Without this, the
    // message compiler treats any HTML-looking tag as unsafe and hard-fails
    // the whole build with "Detected HTML in ... message".
    compilation: {
      strictMessage: false,
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
