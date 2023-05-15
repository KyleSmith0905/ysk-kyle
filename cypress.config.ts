import { defineConfig } from 'cypress';
import plugins from './tests/plugins/index.js';

export default defineConfig({
  chromeWebSecurity: false,
  fixturesFolder: 'tests/fixtures',
  screenshotsFolder: 'tests/screenshots',
  videosFolder: 'tests/videos',
  downloadsFolder: 'tests/downloads',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // @ts-expect-error This is auto-generated working code.
    setupNodeEvents(on, config) {
      return plugins(on, config);
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'tests/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/support/index.js',
  },
});
