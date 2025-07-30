import { ApiHelper } from 'utils/ApiHelper';
import {test,expect} from '../fixtures/BaseTest';

test.describe('Checkout Page - @regression @checkout', () => {
    test('Place Order: Register while Checkout', async ({homePage, cartPage, loginPage, checkOutPage, user, page}) => {
        await homePage.addProductByNumberOrder(1);
        await homePage.cartConfirmationDialog.clickViewCart();
        await cartPage.clickCheckOut();
        await ApiHelper.createUser(user);
        await cartPage.checkOutConfirmationDialog.clickRegisterOrLogin();
        await loginPage.login(user);
        await homePage.openCart();
        await cartPage.clickCheckOut();
        expect(await checkOutPage.verifyDeliveryAddress(user)).toBeTruthy();
        expect(await checkOutPage.verifyBillingAddress(user)).toBeTruthy();
        expect(await checkOutPage.isProductInCart()).toBeTruthy();
        await checkOutPage.enterMessage("This is a test message.");
        await checkOutPage.clickPlaceOrder();
        await checkOutPage.enterNameOnCard(user.getName());
        await checkOutPage.enterCardNumber("123456789");
        await checkOutPage.enterCVC("311");
        await checkOutPage.enterMonthExpiration("12");
        await checkOutPage.enterYearExpiration("2000");
        await checkOutPage.clickPayAndConfirm();
        //await page.pause();
        await checkOutPage.clickDownloadInvoice("./downloads/");
        expect(await checkOutPage.getConfirmationMessage()).toBe("Order Placed!");

    })
});