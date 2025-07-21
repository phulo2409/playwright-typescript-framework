import { Page, expect, Locator} from '@playwright/test';
import { LoginPage } from './LoginPage';
import { BasePage } from './BasePage';
import { ContactUs } from './ContactUs';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';
import { TestCasesPage } from './TestCasesPage';


export class HomePage extends BasePage{
    private readonly loggedAsLink: Locator;
    private readonly deleteAccountLink: Locator;
    private readonly confirmationMessage: Locator;
    private readonly continueButton: Locator;
    private readonly logoutLink: Locator;
    private readonly loginLink: Locator;
    private readonly contactUsLink: Locator;
    private readonly testCasesLink: Locator;
    private readonly productLink: Locator;
    private readonly cartLink: Locator;
    


    constructor(page:Page){
        super(page);
        this.loggedAsLink = page.locator("header i.fa-user~b");
        this.deleteAccountLink = page.locator("header a:has-text('Delete Account')");
        this.logoutLink = page.locator("header a:has-text('Logout')");
        this.confirmationMessage = page.locator("h2.title");
        this.continueButton = page.locator("a:has-text('Continue')");
        this.loginLink = page.getByRole("link", { name: "Signup / Login" });
        this.contactUsLink = page.getByRole("link", { name: "Contact us" });
        this.testCasesLink = page.getByRole("link", { name: "Test Cases" });
        this.productLink = page.getByRole("link", { name: "Products" });
        this.cartLink = page.getByRole("link", { name: "Cart" });
        
    }
    
    async openLogin(): Promise<LoginPage>{
        await this.loginLink.click();
        return new LoginPage(this.page);
    }

    async openContactUs(): Promise<ContactUs>{
        await this.contactUsLink.click();
        await this.page.waitForLoadState('load');
        return new ContactUs(this.page);
    }

    async openTestCases(): Promise<TestCasesPage>{
        await this.testCasesLink.click();
        return new TestCasesPage(this.page);
    }

    async openProducts(): Promise<ProductsPage>{
        await this.productLink.click();
        await this.page.waitForLoadState('load');
        return new ProductsPage(this.page);
    }

    async openCart(): Promise<CartPage>{
        await this.cartLink.click();
        await this.page.waitForLoadState('load');
        return new CartPage(this.page);
    }

    async navigateToURL(): Promise<void>{
        await this.page.goto("/");
    }

    async isHomePageExists(): Promise<boolean>{
        let title: string = await this.page.title();
        if(title){
            return true;
        }
        return false;
    }

    async getUserNameLogged(): Promise<string | null>{
        return await this.loggedAsLink.textContent();
    }

    async clickDeleteAccount(): Promise<void>{
        await this.deleteAccountLink.click();
    }

    async getConfirmationMessage(): Promise<string | null>{
        return await this.confirmationMessage.textContent();
    }

    async clickContinue(): Promise<void>{
        await this.continueButton.click();
    }

    async clickLogout(): Promise<LoginPage>{
        await this.logoutLink.click();
        return new LoginPage(this.page);
    }
}