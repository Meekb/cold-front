// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: false,
  devtools: { enabled: true },
  css: [
    "vuetify/styles",
    "@mdi/font/css/materialdesignicons.css"
  ],
  build: {
    transpile: ["vuetify"]
  },
  vite: {
    ssr: {
      noExternal: ["vuetify"]
    },
    define: {
      "process.env.DEBUG": false // Fixes some build issues
    }
  }
})
