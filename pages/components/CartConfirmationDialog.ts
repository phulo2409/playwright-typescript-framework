import{Page} from '@playwright/test';
import { BaseConfirmationDialog } from '../common/BaseConfirmationDialog';
import { CartPage } from '@pages/pageObject/CartPage';

export class CartConfirmationDialog extends BaseConfirmationDialog {
    constructor(page: Page) {
      super(page, 'Continue Shopping', 'View Cart');
    }
  
    async clickContinueShopping(): Promise<void> {
      await this.clickFirstButton();
    }
  
    async clickViewCart(): Promise<CartPage> {
      await this.clickSecondLink();
      await this.page.waitForLoadState('load');
      return new CartPage(this.page);
    }
  }