// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  eslint: {
    config: {
      standalone: false,
    },
  },
  app: {
    head: {
      title: 'AI时钟',
      htmlAttrs: {
        lang: 'zh-CN',
      },
    },
  },
  vite: {
    assetsInclude: ['**/*.html'],
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
})
