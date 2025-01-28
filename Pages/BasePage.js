const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

class BasePage {

    constructor(page) {

        this.page = page;
    }

    // this method checks for the page accessibility
    async analyzeAccessibility(testInfo, url) {

        const axeResults = await new AxeBuilder({ page: this.page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        await testInfo.attach('Axe Results' + url, {
            body: JSON.stringify(axeResults, null, 2),
            contentType: 'application/json'
        });

    }


}

module.exports = { BasePage };