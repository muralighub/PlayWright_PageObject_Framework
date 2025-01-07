const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright');

class CartPage {

    constructor(page) {

        this.page = page;
        this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        // Mask
        this.cartProdName = page.locator('.inventory_item_name');
        this.cartProdDesc = page.locator('.inventory_item_desc');
        this.cartProdPrice = page.locator('.inventory_item_price');
        this.cartProdQty = page.locator('.cart_quantity');
        this.cartBtn = page.locator('.shopping_cart_link');
    }

    async verifyCartItemsToAddedProducts(products) {

        const cartItems = await this.cartItemNames.allTextContents();
        console.log(cartItems);
        // sort() to arange alphabeticaly and compare
        // expect.soft(cartItems.sort()).toEqual(NeededProduct.sort()); 
        expect.soft(cartItems.sort()).toEqual(products.sort());

    }

    async clickOnCheckoutButton() {
        await this.checkoutButton.click();
    }


    async cartPageVisualTest() {

        await expect(this.checkoutButton).toBeVisible();
        expect.soft(await this.page.screenshot({ mask: [this.page.locator('[data-test="footer-copy"]')] })).toMatchSnapshot(["ScreenShots", 'cartpage.png']);

    }

    
}

module.exports = { CartPage };