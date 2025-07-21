import { Page, expect, Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class TestCasesPage extends BasePage{

    constructor(page: Page){
        super(page);
    }
}
