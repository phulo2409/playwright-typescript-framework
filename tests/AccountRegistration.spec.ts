import {test,expect} from '../fixtures/BaseTest';
import { faker } from '@faker-js/faker';
import { allure } from 'allure-playwright';
import { ApiHelper } from '../utils/ApiHelper';

test.describe('Account Registration tests - @regression @auth', () =>{
    test.describe.configure({mode: 'default'});
    test('Register User', async ({homePage, loginPage, user})=>{
        await allure.step("1. Enter name and email address to Signup form", async() =>{
            loginPage = await homePage.openLogin();
            await loginPage.enterNameSignup(user.getName());
            await loginPage.enterEmailSignup(user.getEmail());
            await loginPage.clickSignup();
        });
        
        await allure.step("2. Fill data to registration", async() =>{
            await loginPage.completeFillRegistration(user);
        });

        await allure.step("Verify that 'ACCOUNT CREATED!' is visible", async() =>{
            expect(await loginPage.getConfirmationMessage()).toBe("Account Created!")
        });

        await allure.step("3. Click 'Continue' button", async() =>{
            homePage = await loginPage.clickContinue();
        });
        
        await allure.step(`Verify that Logged in as ${user.getName()} is visible`, async() => {
            expect(await homePage.getUserNameLogged()).toBe(user.getName());
        });
    });

    test('Login User with correct email and password', async ({homePage, loginPage, user})=>{
        await allure.step("Pre-condition: create account by API", async() =>{
            await ApiHelper.createUser(user);
        });

        await allure.step("Enter correct email address and password to Login", async() =>{
            loginPage = await homePage.openLogin();
            homePage = await loginPage.login(user.getEmail(), user.getPassword());
        });

        await allure.step(`Verify that Logged in as ${user.getName()} is visible`, async() => {
            expect(await homePage.getUserNameLogged()).toBe(user.getName());
        });
    });

    test('Login User with incorrect email and password', async ({homePage, loginPage, user})=>{
        await allure.step("Enter incorrect email address and password", async() =>{
            loginPage = await homePage.openLogin();
            homePage = await loginPage.login(faker.internet.email(), user.getPassword());
        });
        
        await allure.step("Verify error 'Your email or password is incorrect!' is visible", async() => {
            expect(await loginPage.getLoginErrorMsg()).toBe("Your email or password is incorrect!");
        });
    });

    test('Logout User', async ({homePage, loginPage, user})=>{
        await allure.step("Pre-condition: create account by API", async() =>{
            await ApiHelper.createUser(user);
        });

        await allure.step("1.Enter correct email address and password to Login", async() =>{
            loginPage = await homePage.openLogin();
            homePage = await loginPage.login(user.getEmail(), user.getPassword());
        });

        await allure.step(`Verify that Logged in as ${user.getName()} is visible`, async() => {
            expect(await homePage.getUserNameLogged()).toBe(user.getName());
        });

        await allure.step("2.Click 'Logout' button", async() =>{
            loginPage = await homePage.clickLogout();
        });

        await allure.step("Verify that user is navigated to login page", async() =>{
            expect(await loginPage.getPageTitle()).toBe("Automation Exercise - Signup / Login");
        });
    });

    test('Register User with existing email', async ({homePage, loginPage, user})=>{
        await allure.step("Pre-condition: create account by API", async() =>{
            await ApiHelper.createUser(user);
        });

        await allure.step("Enter name and email address to Signup form", async() =>{
            loginPage = await homePage.openLogin();
            await loginPage.enterNameSignup(user.getName());
            await loginPage.enterEmailSignup(user.getEmail());
            await loginPage.clickSignup();
        });

        await allure.step("Verify error 'Email Address already exist!' is visible", async() =>{
            expect(await loginPage.getSignupErrorMsg()).toBe("Email Address already exist!")
        });
    });
});
