const { test, expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {

    constructor(page) {

        super(page);
        this.page = page;
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.zip = page.getByPlaceholder('Zip/Postal Code')
        this.continueButton = page.locator('#continue');
    }


    async fillCheckoutDetails(firstname, lastname, zip) {

        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.zip.fill(zip);

    }

    async clickOnContinue() {

        await this.continueButton.click();
    }

    async checkoutPageVisualTest() {

        await expect(this.continueButton).toBeVisible();
        expect.soft(await this.page.screenshot({ mask: [this.page.locator('[data-test="footer-copy"]')] })).toMatchSnapshot(["ScreenShots", 'checkoutpage.png']);

    }


}
module.exports = { CheckoutPage };