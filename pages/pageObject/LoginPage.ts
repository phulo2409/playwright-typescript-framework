import { Page, expect, Locator} from '@playwright/test';
import { HomePage } from './HomePage';
import { BasePage } from '../common/BasePage';
import { UserRandom } from '@data/UserRandom';
import { HeaderComponent } from '@pages/components/HeaderComponent';

export class LoginPage extends BasePage{
    readonly headerComponent: HeaderComponent;
    private readonly nameTextbox: Locator;
    private readonly emailTextbox: Locator;
    private readonly maleRadio: Locator;
    private readonly passwordTextbox: Locator;
    private readonly dayDropdown: Locator;
    private readonly monthDropdown: Locator;
    private readonly yearDropdown: Locator;
    private readonly firstNameTextbox: Locator;
    private readonly lastNameTextbox: Locator;
    private readonly companyTextbox: Locator;
    private readonly address1Textbox: Locator;
    private readonly address2Textbox: Locator;
    private readonly countryDropdown: Locator;
    private readonly stateTextbox: Locator;
    private readonly cityTextbox: Locator;
    private readonly zipcodeTextbox: Locator;
    private readonly mobileTextbox: Locator;
    private readonly newletterCheckbox: Locator;
    private readonly offerCheckbox: Locator;
    private readonly signupButton: Locator;
    private readonly createAccountButton: Locator;
    private readonly continueButton: Locator;
    private readonly emailLoginTextbox: Locator;
    private readonly loginButton: Locator;
    private readonly passwordLoginTextbox: Locator;
    private readonly loginErrorMsg: Locator;
    private readonly signupErrorMsg: Locator;

    constructor(page:Page){
        super(page);
        this.headerComponent = new HeaderComponent(page);
        this.nameTextbox = page.locator("input[name='name']");
        this.emailTextbox = page.locator("input[data-qa='signup-email']");
        this.maleRadio = page.locator("#id_gender1");
        this.passwordTextbox = page.locator("#password");
        this.dayDropdown = page.locator("#days");
        this.monthDropdown = page.locator("#months");
        this.yearDropdown = page.locator("#years");
        this.firstNameTextbox = page.locator("#first_name");
        this.lastNameTextbox = page.locator("#last_name");
        this.companyTextbox = page.locator("#company");
        this.address1Textbox = page.locator("#address1");
        this.address2Textbox = page.locator("#address2");
        this.countryDropdown = page.locator("#country");
        this.stateTextbox = page.locator("#state");
        this.cityTextbox = page.locator("#city");
        this.zipcodeTextbox = page.locator("#zipcode");
        this.mobileTextbox = page.locator("#mobile_number");
        this.newletterCheckbox = page.locator("#newsletter")
        this.offerCheckbox = page.locator("#optin");
        this.signupButton = page.locator("button:has-text('Signup')");
        this.createAccountButton = page.locator("button:has-text('Create Account')");
        this.continueButton = page.locator("a:has-text('Continue')");

        this.emailLoginTextbox = page.locator("input[data-qa='login-email']");
        this.passwordLoginTextbox = page.locator("input[data-qa='login-password']");
        this.loginButton = page.locator("button:has-text('Login')");

        this.loginErrorMsg = page.locator("div.login-form p");
        this.signupErrorMsg = page.locator("div.signup-form p");
    }

    async enterNameSignup(name: string): Promise<void>{
        await this.nameTextbox.fill(name);
    }

    async enterEmailSignup(email: string): Promise<void>{
        await this.emailTextbox.fill(email);
    }

    async checkMaleRadio(): Promise<void>{
        await this.maleRadio.check();
    }

    async enterPassword(password: string): Promise<void>{
        await this.passwordTextbox.fill(password);
    }

    async selectDay(day: string): Promise<void>{
        await this.dayDropdown.selectOption(day);
    }

    async selectMonth(month: string): Promise<void>{
        await this.monthDropdown.selectOption(month);
    }

    async selectYear(year: string): Promise<void>{
        await this.yearDropdown.selectOption(year);
    }

    async checkNewLetter(): Promise<void>{
        await this.newletterCheckbox.check();
    }

    async checkOffer(): Promise<void>{
        await this.offerCheckbox.check();
    }

    async enterFirstName(firstName: string): Promise<void>{
        await this.firstNameTextbox.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void>{
        await this.lastNameTextbox.fill(lastName);
    }

    async enterCompany(company: string): Promise<void>{
        await this.companyTextbox.fill(company);
    }

    async enterAddress1(address1: string): Promise<void>{
        await this.address1Textbox.fill(address1);
    }

    async enterAddress2(address2: string): Promise<void>{
        await this.address2Textbox.fill(address2);
    }

    async selectCountry(country: string): Promise<void>{
        await this.countryDropdown.selectOption(country);
    }

    async enterState(state: string): Promise<void>{
        await this.stateTextbox.fill(state);
    }

    async enterCity(city: string): Promise<void>{
        await this.cityTextbox.fill(city);
    }

    async enterZipcode(zipcode: string): Promise<void>{
        await this.zipcodeTextbox.fill(zipcode);
    }

    async enterMobileNumber(mobileNumber: string): Promise<void>{
        await this.mobileTextbox.fill(mobileNumber);
    }

    async clickCreateAccount(): Promise<void>{
        await this.createAccountButton.click();
    }

    async clickSignup(): Promise<void>{
        await this.signupButton.click();
    }

    async clickContinue(): Promise<HomePage>{
        await this.continueButton.click();
        return new HomePage(this.page);
    }

    async getLoginErrorMsg(): Promise<string | null>{
        return await this.loginErrorMsg.textContent();
    }

    async getSignupErrorMsg(): Promise<string | null>{
        return await this.signupErrorMsg.textContent();
    }

    // async completeFillRegistration(userData:{
    //     password: string;
    //     day: string;
    //     month: string;
    //     year: string;
    //     firstName: string;
    //     lastName: string;
    //     company: string;
    //     address1: string;
    //     address2: string;
    //     country: string;
    //     state: string;
    //     city: string;
    //     zipcode: string;
    //     mobileNumber: string;
    // }): Promise<void>{
    //     await this.checkMaleRadio();
    //     await this.enterPassword(userData.password);
    //     await this.selectDay(userData.day);
    //     await this.selectMonth(userData.month);
    //     await this.selectYear(userData.year);
    //     await this.enterFirstName(userData.firstName);
    //     await this.enterLastName(userData.lastName);
    //     await this.enterCompany(userData.company);
    //     await this.enterAddress1(userData.address1);
    //     await this.enterAddress2(userData.address2);
    //     await this.selectCountry(userData.country);
    //     await this.enterState(userData.state);
    //     await this.enterCity(userData.city);
    //     await this.enterZipcode(userData.zipcode);
    //     await this.enterMobileNumber(userData.mobileNumber);
    //     await this.clickCreateAccount();
    // }

    async isLoginPageExists(): Promise<boolean>{
        let title: string = await this.page.title();
        if(title){
            return true;
        }
        return false;
    }

    async completeFillRegistration(user: UserRandom): Promise<void>{
        await this.checkMaleRadio();
        await this.enterPassword(user.getPassword());
        await this.selectDay(user.getDay());
        await this.selectMonth(user.getMonth());
        await this.selectYear(user.getYear());
        await this.enterFirstName(user.getName());
        await this.enterLastName(user.getLastName());
        await this.enterCompany(user.getCompany());
        await this.enterAddress1(user.getAddress1());
        await this.enterAddress2(user.getAddress2());
        await this.selectCountry(user.getCountry());
        await this.enterState(user.getState());
        await this.enterCity(user.getCity());
        await this.enterZipcode(user.getZipCode());
        await this.enterMobileNumber(user.getMobileNumber());
        await this.clickCreateAccount();
    }

    async login(user: UserRandom | string, password?: string): Promise<void>{
        let email: string;
        let pwd: string;

        if (typeof user === 'string') {
            email = user;
            pwd = password!;
        } else {
            email = user.getEmail();
            pwd = user.getPassword();
        }
        await this.emailLoginTextbox.fill(email);
        await this.passwordLoginTextbox.fill(pwd);
        await this.loginButton.click();
        await this.waitForPageLoad();
    }
}