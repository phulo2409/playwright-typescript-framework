import { blockImagesAndCSS } from 'utils/blockImages';
import {test,expect} from '../fixtures/BaseTest';


//test.use({ storageState: './auth/login.json' });

test.beforeEach(async ({page}) => {
    await blockImagesAndCSS(page);
});

test('Test storageState', async ({homePage, page}) => {
    await homePage.openProducts();
    await page.waitForTimeout(5000);
});