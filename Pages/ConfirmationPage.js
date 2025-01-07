const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright');

class ConfirmationPage {


    constructor(page) {

        this.page = page;
        this.confirmText = 'Thank you for your order!';
        this.confirmMsg = page.getByText('Thank you for your order!');
        this.backToHome = page.locator('#back-to-products');
        this.burgerMenu = page.locator('button[id="react-burger-menu-btn"]');
        this.waitForBurgerList = page.locator('.bm-item-list a');
        this.logoutLink = page.locator('[id="logout_sidebar_link"]');
    }


    async verifyOrderConfirmation() {

        expect(await this.confirmMsg.textContent()).toContain(this.confirmText);
    }

    async confirmationPageVisualTest() {

        await expect(this.backToHome).toBeVisible();
        expect.soft(await this.page.screenshot({ mask: [this.page.locator('[data-test="footer-copy"]')] })).toMatchSnapshot(["ScreenShots", 'confirmationpage.png']);
        
    }

    async clickOnLogoutLink() {

        // click on the "Burger menu" and select "Log Out"       
        await this.burgerMenu.click();
        await this.waitForBurgerList.last().waitFor();
        await this.logoutLink.click();        
    }

    
}

module.exports = { ConfirmationPage };