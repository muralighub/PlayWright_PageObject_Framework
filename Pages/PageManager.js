const { LoginPage } = require('./LoginPage');
const { ProductsPage } = require('./ProductsPage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { OverviewPage } = require('./OverviewPage');
const { ConfirmationPage } = require('./ConfirmationPage');


class PageManager {

    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.productsPage = new ProductsPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.overviewPage = new OverviewPage(this.page);
        this.confirmationPage = new ConfirmationPage(this.page);

    }

    getLoginPage() {

        return this.loginPage;
    }

    getProductPage() {

        return this.productsPage;
    }

    getCartPage() {

        return this.cartPage;
    }

    getCheckoutPage() {

        return this.checkoutPage;
    }

    getOverviewPage() {

        return this.overviewPage;
    }

    getConfirmationPage() {

        return this.confirmationPage;
    }


}

module.exports = { PageManager };