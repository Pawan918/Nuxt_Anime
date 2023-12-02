// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode : {
    preference : 'light'
  },
  modules: ['@pinia/nuxt', '@nuxt/ui', "@nuxt/image"],
  ui: {
    global: true,
    icons: ['mdi']
  },
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})