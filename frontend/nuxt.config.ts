import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  runtimeConfig: {
    public: {
      version: "1.0.0",
      services: {
        laravel: process.env.NUXT_PUBLIC_LARAVEL_API_URL,
      },
    },
  },
  imports: {
    dirs: ["shared/types"],
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  colorMode: {
    preference: "light", // default theme
    fallback: "light", // fallback when system preference not found
    classSuffix: "",
  },
});
