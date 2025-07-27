import{Page} from '@playwright/test';
import { BaseConfirmationDialog } from '../common/BaseConfirmationDialog';

export class CheckoutConfirmationDialog extends BaseConfirmationDialog {
    constructor(page: Page) {
      super(page, 'Continue On Cart', 'Register / Login');
    }
  
    async clickContinueOnCart(): Promise<void> {
      await this.clickFirstButton();
    }
  
    async clickRegisterOrLogin(): Promise<void> {
      await this.clickSecondLink();
    }
  }