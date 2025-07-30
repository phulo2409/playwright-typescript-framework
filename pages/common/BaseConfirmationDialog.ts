import{Page, expect, Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class BaseConfirmationDialog extends BasePage {
    private readonly firstButton: Locator;
    private readonly secondLink: Locator;
  
    constructor(page: Page, firstBtnLabel: string, secondLinkLabel: string) {
      super(page);
      this.firstButton = page.getByRole('button', { name: firstBtnLabel });
      this.secondLink = page.getByRole('link', { name: secondLinkLabel });
    }
  
    protected async clickFirstButton(): Promise<void> {
      await this.firstButton.click();
    }
  
    protected async clickSecondLink(): Promise<void> {
      await this.secondLink.click();
      await this.waitForPageLoad();
    }
  }