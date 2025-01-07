const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  reporter: [["html"], ["line"], ["allure-playwright"]],
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: true,
        trace: 'on',
        video: 'on',
        screenshot: 'only-on-failure'
      },
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: true,
        trace: 'on',
        video: 'on',
        screenshot: 'only-on-failure'
      },
    },
    {
      name: 'Edge',
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        headless: true,
        trace: 'on',
        video: 'on',
        screenshot: 'only-on-failure'
      },
    },
  ],
  use: {
    browserName: 'chromium',
    headless: true,
    trace: 'on',
    video: 'on',
    screenshots: 'only-on-failure'
  },

});

