import { Page, expect, Locator} from '@playwright/test';

export class BasePage{
    protected readonly page: Page;
    protected readonly confirmationMessage: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.confirmationMessage = page.locator("h2.title");
    }

    async getPageTitle(): Promise<string>{
        return await this.page.title();
    }

    async getConfirmationMessage(): Promise<string | null>{
        return await this.confirmationMessage.textContent();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('load');
    }

    async clickHeaderLinkByText(linkText: string) {
        await this.page.getByRole('link', { name: linkText }).click();
    }

    async safeClick(locator: Locator) {
        await expect(locator).toBeVisible();
        await expect(locator).toBeEnabled();
        await locator.click();
    }

}