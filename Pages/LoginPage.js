const { test, expect } = require('@playwright/test');
const { BasePage } = require('./BasePage'); 

class LoginPage extends BasePage {


    constructor(page) {

        super(page);
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.locator('#login-button');
        this.waitForText = page.getByText('Swag Labs');
    }

    async goToHomePage() {

        await this.page.goto('https://www.saucedemo.com/');
    }

    async loginAsStandardUser(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.waitForText.waitFor();
    }

    async loginPageVisualTest() {


        await expect(this.loginButton).toBeVisible();
        expect.soft(await this.page.screenshot({ mask: [this.page.locator('[data-test="footer-copy"]')] })).toMatchSnapshot(["ScreenShots", 'loginpage.png']);

    }

    


}
module.exports = { LoginPage };