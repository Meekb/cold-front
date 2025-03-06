import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import { aliases, mdi } from "vuetify/iconsets/mdi"
import "vuetify/styles"
import "@mdi/font/css/materialdesignicons.css"

export default defineNuxtPlugin((nuxtApp) => {
   const vuetify = createVuetify({
      components,
      directives,
      icons: {
         defaultSet: "mdi",
         aliases,
         sets: { mdi },
      },
      theme: {
         defaultTheme: "coldFront",
         themes: {
            coldFront: {
               dark: true,
               colors: {
                  primary: "#0B3D91",
                  secondary: "#D72638",
                  accent: "#F8D210",
                  background: "#1E1E1E",
                  surface: "#2C2C2C",
                  error: "#D72638",
               },
            },
         },
      },
   })

   nuxtApp.vueApp.use(vuetify)
})
