import { defineConfig } from 'cypress';

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'https://login-b2bit.netlify.app/',
    testIsolation: false,
  },
});
