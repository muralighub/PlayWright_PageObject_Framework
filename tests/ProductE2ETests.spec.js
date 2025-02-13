const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const { PageManager } = require('../Pages/PageManager');
const productsData = JSON.parse(JSON.stringify(require('../Utils/Products_Data.json')));
const checkoutData = JSON.parse(JSON.stringify(require('../Utils/Checkout_Data.json')));

// these contain data for login and products 
const { username, password, products } = productsData;
// this contains the data for checkout page
const { firstname, lastname, zip } = checkoutData;

test('verify products are displayed in decending order Z to A', async ({ page }) => {

    const pageManager = new PageManager(page);
    const loginPage = pageManager.getLoginPage();
    await loginPage.goToHomePage();
    // login as standard user
    await loginPage.loginAsStandardUser(username, password);
    const productsPage = pageManager.getProductPage();
    // click on all items link
    await productsPage.clickOnAllItemsLink();
    // select the Z to A filter, products should be displayed in decending order
    await productsPage.verifyProductsAreDisplayedZtoA("Name (Z to A)");
    await productsPage.clickOnLogoutLink();

});

test('verify products prices are displayed from high to low', async ({ page }) => {

    const pageManager = new PageManager(page);
    const loginPage = pageManager.getLoginPage();
    await loginPage.goToHomePage();
    // login as standard user
    await loginPage.loginAsStandardUser(username, password);
    const productsPage = pageManager.getProductPage();
    // click on all items link
    await productsPage.clickOnAllItemsLink();
    // select high to low price filter, products should be displayed in decending price order
    await productsPage.verifyPricesAreDisplayedHighToLow("Price (high to low)");
    await productsPage.clickOnLogoutLink();

});

test('verify checkout by adding 3 or more products to cart', async ({ page }) => {

    const pageManager = new PageManager(page);
    const loginPage = pageManager.getLoginPage();
    await loginPage.goToHomePage();
    // login as standard user
    await loginPage.loginAsStandardUser(username, password);
    const productsPage = pageManager.getProductPage();
    //click on all items link
    await productsPage.clickOnAllItemsLink();
    // add the desired products to cart
    await productsPage.addProductsToCart(products);
    await productsPage.clickonCartButton();
    const cartPage = pageManager.getCartPage();
    await cartPage.clickOnCheckoutButton();
    const checkoutPage = pageManager.getCheckoutPage();
    // enter customer details
    await checkoutPage.fillCheckoutDetails(firstname, lastname, zip);
    await checkoutPage.clickOnContinue();
    const overviewPage = pageManager.getOverviewPage();
    await overviewPage.verifyPaymentAndDeliveryDetails();
    await overviewPage.clickOnFinishButton();
    const confirmationPage = pageManager.getConfirmationPage();
    await confirmationPage.verifyOrderConfirmation();
    await confirmationPage.clickOnLogoutLink();


});

test('verify products added to cart on cart page', async ({ page }) => {

    const pageManager = new PageManager(page);
    const loginPage = pageManager.getLoginPage();
    await loginPage.goToHomePage();
    //login as standard user
    await loginPage.loginAsStandardUser(username, password);
    const productsPage = pageManager.getProductPage();
    await productsPage.clickOnAllItemsLink();
    // add the desired products to cart
    await productsPage.addProductsToCart(products);
    await productsPage.clickonCartButton();
    const cartPage = pageManager.getCartPage();
    // add desired products, verify them on cart page
    await cartPage.verifyCartItemsToAddedProducts(products)
    await cartPage.clickOnCheckoutButton();
    const checkoutPage = pageManager.getCheckoutPage();
    await checkoutPage.fillCheckoutDetails(firstname, lastname, zip);
    await checkoutPage.clickOnContinue();
    const overviewPage = pageManager.getOverviewPage();
    await overviewPage.verifyPaymentAndDeliveryDetails();
    await overviewPage.clickOnFinishButton();
    const confirmationPage = pageManager.getConfirmationPage();
    await confirmationPage.verifyOrderConfirmation();
    await confirmationPage.clickOnLogoutLink();

});


test('verify total price on overview page', async ({ page }) => {

    const pageManager = new PageManager(page);
    const loginPage = pageManager.getLoginPage();
    await loginPage.goToHomePage();
    //login as standard user
    await loginPage.loginAsStandardUser(username, password);
    const productsPage = pageManager.getProductPage();
    await productsPage.clickOnAllItemsLink();
    // add desired products to cart
    await productsPage.addProductsToCart(products);
    await productsPage.clickonCartButton();
    const cartPage = pageManager.getCartPage();
    await cartPage.clickOnCheckoutButton();
    const checkoutPage = pageManager.getCheckoutPage();
    await checkoutPage.fillCheckoutDetails(firstname, lastname, zip);
    await checkoutPage.clickOnContinue();
    const overviewPage = pageManager.getOverviewPage();
    // verify the total price after adding the individual prices
    await overviewPage.verifyTotalPrice();
    // check payment and delivery details
    await overviewPage.verifyPaymentAndDeliveryDetails();
    await overviewPage.clickOnFinishButton();
    const confirmationPage = pageManager.getConfirmationPage();
    await confirmationPage.verifyOrderConfirmation();
    await confirmationPage.clickOnLogoutLink();

});


test('Saucedemo Visual Testing', async ({ page }) => {

    const pageManager = new PageManager(page);
    const loginPage = pageManager.getLoginPage();
    await loginPage.goToHomePage();
    // visual test for login page
    await loginPage.loginPageVisualTest();
    await loginPage.loginAsStandardUser(username, password);
    const productsPage = pageManager.getProductPage();
    // visual test for products page
    await productsPage.productsPageVisualTest();
    await productsPage.addProductsToCart(products);
    await productsPage.clickonCartButton();
    const cartPage = pageManager.getCartPage();
    // visual test for carts page
    await cartPage.cartPageVisualTest();
    await cartPage.verifyCartItemsToAddedProducts(products);
    await cartPage.clickOnCheckoutButton();
    const checkoutPage = pageManager.getCheckoutPage();
    // visual test for checkout page
    await checkoutPage.checkoutPageVisualTest();
    await checkoutPage.fillCheckoutDetails(firstname, lastname, zip);
    await checkoutPage.clickOnContinue();
    const overviewPage = pageManager.getOverviewPage();
    // visual test for overview page   
    await overviewPage.overviewPageVisualTest();
    await overviewPage.verifyPaymentAndDeliveryDetails();
    await overviewPage.clickOnFinishButton();
    const confirmationPage = pageManager.getConfirmationPage();
    // visual test for confirmation page
    await confirmationPage.confirmationPageVisualTest();
    await confirmationPage.verifyOrderConfirmation();
    await confirmationPage.clickOnLogoutLink();

});


test('Accessibility Testing', async ({ page }, testInfo) => {

    const pageManager = new PageManager(page);
    const loginPage = pageManager.getLoginPage();
    await loginPage.goToHomePage();
    // accessibility checks for login page
    await loginPage.analyzeAccessibility(testInfo);
    await loginPage.loginAsStandardUser(username, password);
    const productsPage = pageManager.getProductPage();
    // accessibility checks for products page
    await productsPage.analyzeAccessibility(testInfo);
    await productsPage.addProductsToCart(products);
    await productsPage.clickonCartButton();
    const cartPage = pageManager.getCartPage();
    // accessibility checks for cart page
    await cartPage.analyzeAccessibility(testInfo);
    await cartPage.verifyCartItemsToAddedProducts(products);
    await cartPage.clickOnCheckoutButton();
    const checkoutPage = pageManager.getCheckoutPage();
    // accessibility checks for checkout page
    await checkoutPage.analyzeAccessibility(testInfo);
    await checkoutPage.fillCheckoutDetails(firstname, lastname, zip);
    await checkoutPage.clickOnContinue();
    const overviewPage = pageManager.getOverviewPage();
    // accessibility checks for overview page
    await overviewPage.analyzeAccessibility(testInfo);
    await overviewPage.verifyPaymentAndDeliveryDetails();
    await overviewPage.clickOnFinishButton();
    const confirmationPage = pageManager.getConfirmationPage();
    // accessibility checks for confirmation page
    await confirmationPage.analyzeAccessibility(testInfo);
    await confirmationPage.verifyOrderConfirmation();


});











