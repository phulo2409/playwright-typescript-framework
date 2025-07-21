import {test,expect} from '../fixtures/BaseTest';
import { TestConfig } from '../test.config';

const config = new TestConfig();


test.describe('Function Page - @regression @func', ()=>{
    test('Contact Us Form', async({homePage, contactUs, user}) =>{
        contactUs = await homePage.openContactUs();
        expect(await contactUs.isTitleVisible()).toBeTruthy();
        await contactUs.enterName(user.getName());
        await contactUs.enterEmail(user.getEmail());
        await contactUs.enterSubject(config.subject);
        await contactUs.enterMessage(config.message);
        await contactUs.uploadFile(config.fileUpload);
        await contactUs.clickSubmit();
        expect(await contactUs.getSuccessMessage()).toBe("Success! Your details have been submitted successfully.");
        
    })
})




