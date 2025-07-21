import{Page, expect, Locator} from '@playwright/test';
import { CartPage } from './CartPage';

export class CartConfirmationDialog{
    protected readonly page: Page;
    private readonly continueShoppingButton: Locator;
    private readonly viewCartLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
        this.viewCartLink = page.getByRole("link", { name: "View Cart" });
    }

    async clickContinueShopping(): Promise<void>{
        await this.continueShoppingButton.click();
    }

    async clickViewCart(): Promise<CartPage>{
        await this.viewCartLink.click();
        await this.page.waitForLoadState('load');
        return new CartPage(this.page);
    }

}