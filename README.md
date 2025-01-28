# Playwright E2E Testing Project

This Playwright Project covers the following E2E test scenarios:

1. Verify the sorting order displayed for Z-A on the “All Items” page
2. Verify the price order (high-low) displayed on the “All Items” page
3. Add multiple items to the cart and validate the checkout journey
4. Automated visual regression testing for each page
5. Automated Accessibility test for each page

## System Requirements
1. Windows OS
2. Node.js installed

## How to set up and run the tests locally

1. Download the zip file, unzip it, and open it using Visual Studio Code.
2. In the terminal of VS Code IDE run "npm install" to install dependencies.
3. To run the test use the below commands as needed
  
   Install dependencies
   ```bash
   npm install
   ```
   Install playwright browsers 
   ```bash
   npx playwright install --with-deps
   ```
   Headless Mode
   ```bash
   npx playwright test tests/AssignmentCheckout.spec.js 
   ```
   Headed Mode
   ```bash
   npx playwright test tests/AssignmentCheckout.spec.js --headed
   ```
   To run the test on a specific browser using project settings
   ```bash
   npx playwright test tests/AssignmentCheckout.spec.js --headed --project=chrome
   ```
   To update snapshots for visual tests
   ```bash
   npx playwright test tests/AssignmentCheckout.spec.js --headed --project=chrome --update-snapshots
   ```

## To run E2E tests and generate allure reports

   ```bash 
   npx playwright test tests/Assignment.spec.js --reporter=line,allure-playwright --headed --project=chrome
   ```

## To generate allure html report after the tests have been run

   ```bash
   npx allure generate ./allure-results --clean
   ```
   ```bash
   npx allure open ./allure-report
   ```
