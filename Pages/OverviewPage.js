const { test, expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class OverviewPage extends BasePage {

    constructor(page) {

        super(page);
        this.page = page;
        this.payment = page.locator('[data-test="payment-info-value"]');
        this.delivery = page.locator('[data-test="shipping-info-value"]');
        this.paymentInfo = "SauceCard #31337";
        this.deliveryInfo = "Free Pony Express Delivery!";
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        //mask
        this.cartProdName = page.locator('.inventory_item_name');
        this.cartProdDesc = page.locator('.inventory_item_desc');
        this.cartProdPrice = page.locator('.inventory_item_price');
        this.cartProdQty = page.locator('.cart_quantity');
        this.cartBtn = page.locator('.shopping_cart_link');
        this.totalPrice = page.locator('.summary_subtotal_label');

    }

    async verifyTotalPrice() {

        await expect(this.finishButton).toBeVisible();
        const itemPrices = this.cartProdPrice;
        let sum = 0;
        for (let i = 0; i < await itemPrices.count(); i++) {

            let itemPrice = await itemPrices.nth(i).textContent();
            sum = sum + Number(await itemPrice.replace('$', " ").trim());
        }

        const totalPrice = await this.totalPrice.textContent();
        expect.soft(sum).toEqual(Number(await totalPrice.replace('Item total: $', " ").trim()));

    }



    async verifyPaymentAndDeliveryDetails() {

        expect.soft(this.payment).toHaveText(this.paymentInfo);
        expect.soft(this.delivery).toHaveText(this.deliveryInfo);

    }

    async clickOnFinishButton() {

        await this.finishButton.click();
    }

    async overviewPageVisualTest() {

        await expect(this.finishButton).toBeVisible();
        expect.soft(await this.page.screenshot({ mask: [this.page.locator('[data-test="footer-copy"]')] })).toMatchSnapshot(["ScreenShots", 'overviewpage.png']);

    }



}

module.exports = { OverviewPage };