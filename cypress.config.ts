import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "https://login-page-smoky-beta.vercel.app/",
    testIsolation: false
  },
});
