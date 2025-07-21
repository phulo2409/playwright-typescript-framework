import { Page, expect, Locator} from '@playwright/test';

export class BasePage{
    protected readonly page: Page;
    
    constructor(page: Page){
        this.page = page;
    }

    async getPageTitle(): Promise<string>{
        return await this.page.title();
    }
}