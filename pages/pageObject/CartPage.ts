import { BasePage } from '@pages/common/BasePage';
import { CheckoutConfirmationDialog } from '@pages/components/CheckOutConfirmationDialog';
import{Page, expect, Locator} from '@playwright/test';

export class CartPage extends BasePage {
    readonly checkOutConfirmationDialog: CheckoutConfirmationDialog;
    private readonly productTable: Locator;
    private readonly productNameList: Locator;
    private readonly quantityByName: Locator;
    private readonly deleteButton: Locator;
    private readonly checkOutButton: Locator;

    constructor(page: Page){
        super(page);
        this.checkOutConfirmationDialog = new CheckoutConfirmationDialog(page);
        this.productTable = page.locator("#cart_info table");
        this.productNameList = page.locator("#cart_info_table .cart_description h4");
        this.quantityByName = page.locator("//h4/parent::td/following-sibling::td//button");
        this.deleteButton = page.locator("td.cart_delete a");
        this.checkOutButton = page.locator('a.check_out');
    }

    async isProductNameExist(productName: string): Promise<boolean>{
        const product = await this.productNameList.allTextContents();
        return product.includes(productName);
    }

    async getQuantityOfFirstProduct(): Promise<string | null>{
        return await this.quantityByName.nth(0).textContent();
    }

    async deleteAllProduct(): Promise<void>{
        const buttonList = await this.deleteButton.count();
        if (buttonList >= 1){
            for(let i = 0; i < buttonList; i++){
                await this.deleteButton.nth(i).click();
                await this.deleteButton.nth(i).waitFor({ state: 'hidden'});
            }
        }
        else {
            throw new Error ("Delete Button doesn't exist");
        }
    } 

    async isProductExist(): Promise<boolean>{
        return await this.productTable.isVisible();
    }

    async clickCheckOut(): Promise<void>{
        await this.checkOutButton.click();
        await this.waitForPageLoad();
    }


}