import { blockImages } from 'utils/blockImages';
import {test,expect} from '../fixtures/BaseTest';
import { ApiHelper } from '../utils/ApiHelper';


test.describe('Product tests - @regression @product', () => {
    test.beforeEach(async ({page}) => {
        await blockImages(page);
    });

    test("Verify All Products and product detail page", async ({homePage, productsPage, productDetailPage})=>{
        await homePage.openProducts();
        expect(await productsPage.isProductVisible()).toBeTruthy();
    
        await productsPage.viewProductByNumber(1);
    
        expect(await productDetailPage.isProductNameVisible()).toBeTruthy();
        expect(await productDetailPage.isCategoryVisible()).toBeTruthy();
        expect(await productDetailPage.isPriceVisible()).toBeTruthy();
        expect(await productDetailPage.isAvailabilityVisible()).toBeTruthy();
        expect(await productDetailPage.isConditionVisible()).toBeTruthy();
        expect(await productDetailPage.isBrandVisible()).toBeTruthy();
    });
    
    test("Search Product", async ({homePage, productsPage})=>{
        await homePage.openProducts();
        expect(await productsPage.isProductVisible()).toBeTruthy();
    
        await productsPage.searchProduct("Men Tshirt");
        expect(await productsPage.isProductNameExists("Men")).toBeTruthy();
    });
    
    test("Add Products in Cart", async ({homePage, productsPage, cartPage})=>{
        await homePage.openProducts();
        expect(await productsPage.isProductVisible()).toBeTruthy();
    
        await productsPage.addProductByNumberOrder(1);
        await productsPage.cartConfirmationDialog.clickContinueShopping();
    
        await productsPage.addProductByNumberOrder(2);
        
        await productsPage.cartConfirmationDialog.clickViewCart();
        await cartPage.isProductNameExist("Blue Top");
        await cartPage.isProductNameExist("Men Tshirt");
    });
    
    test("Verify Product quantity in Cart.", async ({homePage, productsPage, productDetailPage, cartPage})=>{
        await homePage.openProducts();
        expect(await productsPage.isProductVisible()).toBeTruthy();
    
        await productsPage.viewProductByNumber(1);
        expect(await productDetailPage.isProductNameVisible()).toBeTruthy();
    
        await productDetailPage.enterQuantity("4");
        await productDetailPage.clickAddToCart();
        await productDetailPage.cartConfirmationDialog.clickViewCart();
        
        expect(await cartPage.getQuantityOfFirstProduct()).toBe("4");
    });
    
    test("Remove Products From Cart", async ({homePage, productsPage, cartPage})=>{
        await homePage.openProducts();
        expect(await productsPage.isProductVisible()).toBeTruthy();
    
        await productsPage.addProductByNumberOrder(1);
        await productsPage.cartConfirmationDialog.clickViewCart();
        await cartPage.deleteAllProduct();
        expect(await cartPage.isProductExist()).toBeFalsy();
    });
    
    test("View Category Products", async ({homePage, productsPage, cartPage})=>{
        await homePage.openProducts();
        expect(await productsPage.isProductVisible()).toBeTruthy();
    
        await productsPage.addProductByNumberOrder(1);
        await productsPage.cartConfirmationDialog.clickViewCart();
        await cartPage.deleteAllProduct();
        expect(await cartPage.isProductExist()).toBeFalsy();
    });
    
    test.only("Search Products and Verify Cart After Login", async ({homePage, productsPage, cartPage, user, loginPage,page})=>{
        await homePage.openProducts();
        expect(await productsPage.isProductVisible()).toBeTruthy();
    
        await productsPage.searchProduct("Men Tshirt");
        expect(await productsPage.isProductNameExists("Men Tshirt")).toBeTruthy();
        await productsPage.addProductByNumberOrder(1);
    
        await productsPage.cartConfirmationDialog.clickViewCart();
        expect(await cartPage.isProductNameExist("Men Tshirt")).toBeTruthy();
    
        await ApiHelper.createUser(user);
        await homePage.openLogin();
        await loginPage.login(user);
        await homePage.openCart();
        expect(await cartPage.isProductNameExist("Men Tshirt")).toBeTruthy();
    })
})






