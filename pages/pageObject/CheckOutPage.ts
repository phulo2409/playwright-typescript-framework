import { UserRandom } from '@data/UserRandom';
import { expect, Locator, Page } from '@playwright/test';
import { CartPage } from './CartPage';
import { BasePage } from '@pages/common/BasePage';
import * as fs from 'fs';
import * as path from 'path';


export class CheckOutPage extends BasePage{
    readonly cartPage: CartPage;
    private readonly messageTextArea: Locator;
    private readonly placeOrderButton: Locator;
    private readonly nameOnCartTextbox: Locator;
    private readonly cardNumberTextbox: Locator;
    private readonly cvcTextbox: Locator;
    private readonly monthExpirationTextbox: Locator;
    private readonly yearExpirationTextbox: Locator;
    private readonly payAndConfirmButton: Locator;
    private readonly downloadInvoiceButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartPage = new CartPage(page);
        this.messageTextArea = page.locator("textarea[name='message']");
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
        this.nameOnCartTextbox = page.locator("[data-qa='name-on-card']");
        this.cardNumberTextbox = page.locator("[data-qa='card-number']");
        this.cvcTextbox = page.locator("[data-qa='cvc']");
        this.monthExpirationTextbox = page.locator("[data-qa='expiry-month']");
        this.yearExpirationTextbox = page.locator("[data-qa='expiry-year']");
        this.payAndConfirmButton = page.locator('#submit');
        this.downloadInvoiceButton = page.getByRole('link', { name: 'Download Invoice' });
    }

    private async verifyAddressSection(sectionId: string, user: UserRandom): Promise<boolean> {
        const addressBox = this.page.locator(`#${sectionId}`);
    
        const actualLocators: Locator[] = [
            addressBox.locator('.address_firstname.address_lastname'),
            addressBox.locator('.address_address1.address_address2').nth(0),
            addressBox.locator('.address_address1.address_address2').nth(1),
            addressBox.locator('.address_address1.address_address2').nth(2),
            addressBox.locator('.address_city.address_state_name.address_postcode'),
            addressBox.locator('.address_country_name'),
            addressBox.locator('.address_phone')
        ];

        const expectedValues: string[] = [
            `${user.getTitle()}. ${user.getName()} ${user.getLastName()}`,
            user.getCompany(),
            user.getAddress1(),
            user.getAddress2(),
            `${user.getCity()} ${user.getState()} ${user.getZipCode()}`,
            user.getCountry(),
            user.getMobileNumber()
        ];

        for (let i = 0; i < expectedValues.length; i++) {
            await expect(actualLocators[i]).toHaveText(expectedValues[i]);
        }
        return true;
    }

    async verifyDeliveryAddress(user: UserRandom): Promise<boolean>{
        return await this.verifyAddressSection('address_delivery', user);
    }

    async verifyBillingAddress(user: UserRandom): Promise<boolean> {
        return await this.verifyAddressSection('address_invoice', user);
    }

    async isProductInCart(): Promise<boolean>{
        return await this.cartPage.isProductExist();
    }

    async enterMessage(message: string): Promise<void>{
        await this.messageTextArea.fill(message);
    }

    async clickPlaceOrder(): Promise<void>{
        await this.placeOrderButton.click();
        await this.waitForPageLoad();
    }

    async enterNameOnCard(name: string): Promise<void>{
        await this.nameOnCartTextbox.fill(name);
    }

    async enterCardNumber(cardNumber: string): Promise<void>{
        await this.cardNumberTextbox.fill(cardNumber);
    }
    
    async enterCVC(cvc: string): Promise<void>{
        await this.cvcTextbox.fill(cvc);
    }

    async enterMonthExpiration(month: string): Promise<void>{
        await this.monthExpirationTextbox.fill(month);
    }

    async enterYearExpiration(year: string): Promise<void>{
        await this.yearExpirationTextbox.fill(year);
    }

    async clickPayAndConfirm(): Promise<void>{
        await this.payAndConfirmButton.click();
        await this.waitForPageLoad();
    }

    async clickDownloadInvoice(downloadPath: string): Promise<void>{
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, {recursive: true});
        }
        //await this.downloadInvoiceButton.click();
        const [ download ] = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadInvoiceButton.click()
        ]);
        //const download = await this.page.waitForEvent('download');
        
        const suggesstedFileName: string = download.suggestedFilename();
        const filePath = path.join(downloadPath, suggesstedFileName);
        await download.saveAs(filePath);
    }
}