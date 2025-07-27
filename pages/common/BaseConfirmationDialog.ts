import{Page, expect, Locator} from '@playwright/test';

export class BaseConfirmationDialog {
    protected readonly page: Page;
    private readonly firstButton: Locator;
    private readonly secondLink: Locator;
  
    constructor(page: Page, firstBtnLabel: string, secondLinkLabel: string) {
      this.page = page;
      this.firstButton = page.getByRole('button', { name: firstBtnLabel });
      this.secondLink = page.getByRole('link', { name: secondLinkLabel });
    }
  
    protected async clickFirstButton(): Promise<void> {
      await this.firstButton.click();
    }
  
    protected async clickSecondLink(): Promise<void> {
      await this.secondLink.click();
      await this.page.waitForLoadState('load');
    }
  }