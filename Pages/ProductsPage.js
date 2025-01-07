const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright');

class ProductsPage {


    constructor(page) {

        this.page = page;
        this.burgerMenu = page.locator('button[id="react-burger-menu-btn"]');
        this.waitForBurgerList = page.locator('.bm-item-list a');
        this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
        this.closeBurgerList = page.locator('[id="react-burger-cross-btn"]');
        this.waitForProducts = page.locator('div[data-test="inventory-item-name"]');
        this.allItemNames = page.locator('div[data-test="inventory-item-name"]');
        this.allItemPrices = page.locator('[data-test="inventory-item-price"]');
        this.filterDropDown = page.locator('[data-test="product-sort-container"]');
        this.inventoryItems = page.locator('.inventory_item');
        this.cartButton = page.locator('.shopping_cart_link');
        this.allAddToCart_btn = page.locator('[data-test="inventory-item"] button');
        this.logoutLink = page.locator('[id="logout_sidebar_link"]');
    }

    async clickOnAllItemsLink() {

        // click on the "Burger menu" and select "All items"
        await this.burgerMenu.click();
        await this.waitForBurgerList.last().waitFor();
        await this.allItemsLink.click();
        await this.closeBurgerList.click();
        await this.waitForProducts.first().waitFor();
    }

    async verifyProductsAreDisplayedZtoA(ddOption) {

        // get all the product names
        const itemNames = await this.allItemNames.allTextContents();
        console.log("original: " + itemNames);
        // select the Z to A filter to display products in decending alphabetical order
        await this.filterDropDown.selectOption(ddOption);
        await this.allItemNames.first().waitFor();
        // get all the product names after selecting the filter Z to A for comparision
        const itemNamesZtoA = await this.allItemNames.allTextContents();
        console.log("Z to A: " + itemNamesZtoA);
        const itemNamesReverse = itemNames.reverse();
        console.log("original reverse: " + itemNamesReverse);
        // compare the product names are displayed in decending order
        expect.soft(itemNamesZtoA).toEqual(itemNamesReverse);

    }

    async verifyPricesAreDisplayedHighToLow(ddOption) {

        // get all the prices before sorting high to low
        const itemPrices = await this.allItemPrices.allTextContents();
        console.log("original Prices: " + itemPrices);
        // remove the dollar sign for the prices
        const formattedPrice = itemPrices.map(price => price.replace('$', '').trim());
        // sort prices in ascending order for later comparasion
        const formattedPrices = formattedPrice.sort((a, b) => a - b);
        console.log("formatted Prices: " + formattedPrices);
        // select the high to low price filter
        await this.filterDropDown.selectOption(ddOption);
        await this.allItemNames.first().waitFor();
        // get all the prices after selecting the high to low filter
        const itemPriceHightoLow = await this.allItemPrices.allTextContents();
        const formattedPriceHightoLow = itemPriceHightoLow.map(price => price.replace('$', '').trim());
        console.log("Prices High to Low: " + formattedPriceHightoLow);
        // compare the prices are displaed in decending order 
        expect.soft(formattedPrices.reverse()).toEqual(formattedPriceHightoLow);
    }


    async addProductsToCart(products) {
        const itemNames = this.inventoryItems;

        for (let i = 0; i < await itemNames.count(); i++) {

            const productName = await itemNames.locator('.inventory_item_name').nth(i).textContent();

            for (const product of products) {

                if (productName === product) {
                    await itemNames.locator('button').nth(i).click();
                    break;
                }
            }

        }

    }

    async clickonCartButton() {

        await this.cartButton.click();
        await this.allItemNames.first().waitFor();
    }

    async productsPageVisualTest() {

        await this.allAddToCart_btn.first().waitFor();
        expect.soft(await this.page.screenshot({ mask: [this.page.locator('[data-test="footer-copy"]')] })).toMatchSnapshot(["ScreenShots", 'productspage.png']);

    }

    async clickOnLogoutLink() {

        // click on the "Burger menu" and select "Log Out"
        // this.logoutLink = page.locator('id="logout_sidebar_link"');
        await this.burgerMenu.click();
        await this.waitForBurgerList.last().waitFor();
        await this.logoutLink.click();
    }


}

module.exports = { ProductsPage };