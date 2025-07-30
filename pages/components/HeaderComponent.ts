import { BasePage } from '@pages/common/BasePage';
import { Page, expect, Locator} from '@playwright/test';

export class HeaderComponent extends BasePage{
    private readonly logoutLink: Locator;
    private readonly loginLink: Locator;
    private readonly contactUsLink: Locator;
    private readonly testCasesLink: Locator;
    private readonly productLink: Locator;
    private readonly cartLink: Locator;

    constructor(page: Page) {
        super(page)
        this.logoutLink = page.locator("header a:has-text('Logout')");
        this.loginLink = page.getByRole("link", { name: "Signup / Login" });
        this.contactUsLink = page.getByRole("link", { name: "Contact us" });
        this.testCasesLink = page.getByRole("link", { name: "Test Cases" });
        this.productLink = page.getByRole("link", { name: "Products" });
        this.cartLink = page.getByRole("link", { name: "Cart"});
        //this.cartLink = page.locator("//a[normalize-space()='Cart']");
    }

    async clickLogin(): Promise<void>{
        await this.loginLink.click();
        await this.waitForPageLoad();
    }

    async clickContactUs(): Promise<void>{
        await this.contactUsLink.click();
        await this.waitForPageLoad();
    }

    async clickTestCases(): Promise<void>{
        await this.testCasesLink.click();
        await this.waitForPageLoad();
    }

    async clickProducts(): Promise<void>{
        await this.productLink.click();
        await this.waitForPageLoad();
    }

    async clickCart(): Promise<void>{
        await this.cartLink.click();
        await this.waitForPageLoad();
    }

    async clickLogout(): Promise<void>{
        await this.logoutLink.click();
    }


}