import { UserRandom } from '@data/UserRandom';
import { CartPage } from '@pages/pageObject/CartPage';
import { CheckOutPage } from '@pages/pageObject/CheckOutPage';
import { ContactUs } from '@pages/pageObject/ContactUs';
import { HomePage } from '@pages/pageObject/HomePage';
import { LoginPage } from '@pages/pageObject/LoginPage';
import { ProductDetailPage } from '@pages/pageObject/ProductDetailPage';
import { ProductsPage } from '@pages/pageObject/ProductsPage';
import { TestCasesPage } from '@pages/pageObject/TestCasesPage';
import { test as base } from '@playwright/test';


type MyFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    contactUs: ContactUs;
    testCasesPage: TestCasesPage;
    productsPage: ProductsPage;
    productDetailPage: ProductDetailPage;
    cartPage: CartPage;
    checkOutPage: CheckOutPage;
    user: UserRandom;
}

export const test = base.extend<MyFixtures>({
    homePage: async({page}, use)=>{
        let homePage = new HomePage(page);
        await homePage.navigateToURL();
        await use(homePage);
    },

    loginPage: async({page}, use)=>{
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    contactUs: async({page}, use)=>{
        let contactUs = new ContactUs(page);
        await use(contactUs);
    },

    testCasesPage: async({page}, use)=>{
        let testCasesPage = new TestCasesPage(page);
        await use(testCasesPage);
    },

    productsPage: async({page}, use)=>{
        let productsPage = new ProductsPage(page);
        await use(productsPage);
    },

    productDetailPage: async({page}, use)=>{
        let productDetailPage = new ProductDetailPage(page);
        await use(productDetailPage);
    },

    cartPage: async({page}, use)=>{
        let cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkOutPage: async({page}, use) =>{
        let checkOutPage = new CheckOutPage(page);
        await use(checkOutPage);
    },

    user: async({}, use)=>{
        const user = new UserRandom();
        await use(user);
    },
    
});

test.afterEach(async ({ page}) => {
    await page.close();
 });

export { expect } from '@playwright/test';