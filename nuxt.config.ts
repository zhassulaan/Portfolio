// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Portfolio',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
        },
      ]
    }
  },
  devtools: { enabled: true },
  css: [
    "@/assets/css/main.min.css",
    "@fortawesome/fontawesome-free/css/all.css",
  ]
});
