import {test,expect} from '../../fixtures/BaseTest';
import { ApiHelper } from '../../utils/ApiHelper';

test('Login User with correct email and password', async ({homePage, loginPage, page, user})=>{
    await ApiHelper.createUser(user);
    await homePage.openLogin();
    await loginPage.login(user.getEmail(), user.getPassword());
    await page.context().storageState({ path: './auth/login.json' });
});
