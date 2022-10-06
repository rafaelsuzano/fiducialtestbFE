const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "bh5vaa",
  e2e: {
    defaultCommandTimeout: 25000,
    //specPattern: '**/*.cy.js',
    specPattern: '**/*.spec.js',

    baseUrl: 'https://qa.yesaccount.com/login',
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}"
  }

});