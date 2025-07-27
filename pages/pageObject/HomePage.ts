import { Page, expect, Locator} from '@playwright/test';
import { LoginPage } from './LoginPage';
import { BasePage } from '../common/BasePage';
import { ContactUs } from './ContactUs';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';
import { TestCasesPage } from './TestCasesPage';
import { HeaderComponent } from '@pages/components/HeaderComponent';
import { ProductComponent } from '@pages/components/ProductComponent';
import { CartConfirmationDialog } from '@pages/components/CartConfirmationDialog';


export class HomePage extends BasePage{
    private readonly headerComponent: HeaderComponent;
    private readonly productComponent: ProductComponent;
    readonly cartConfirmationDialog: CartConfirmationDialog;
    private readonly loggedAsLink: Locator;
    private readonly deleteAccountLink: Locator;
    private readonly continueButton: Locator;

    constructor(page:Page){
        super(page);
        this.loggedAsLink = page.locator("header i.fa-user~b");
        this.deleteAccountLink = page.locator("header a:has-text('Delete Account')");
        this.continueButton = page.locator("a:has-text('Continue')");
        this.headerComponent = new HeaderComponent(page);
        this.productComponent = new ProductComponent(page);
        this.cartConfirmationDialog = new CartConfirmationDialog(page);
    }
    
    async openLogin(): Promise<LoginPage>{
        await this.headerComponent.clickLogin();
        return new LoginPage(this.page);
    }

    async openContactUs(): Promise<ContactUs>{
        await this.headerComponent.clickContactUs();
        return new ContactUs(this.page);
    }

    async openTestCases(): Promise<TestCasesPage>{
        await this.headerComponent.clickTestCases();
        return new TestCasesPage(this.page);
    }

    async openProducts(): Promise<ProductsPage>{
        await this.headerComponent.clickProducts();
        return new ProductsPage(this.page);
    }

    async openCart(): Promise<CartPage>{
        await this.headerComponent.clickCart();
        return new CartPage(this.page);
    }

    async navigateToURL(): Promise<void>{
        await this.page.goto("/");
    }

    async isHomePageExists(): Promise<boolean>{
        let title: string = await this.page.title();
        if(title){
            return true;
        }
        return false;
    }

    async getUserNameLogged(): Promise<string | null>{
        return await this.loggedAsLink.textContent();
    }

    async clickDeleteAccount(): Promise<void>{
        await this.deleteAccountLink.click();
    }

    async getConfirmationMessage(): Promise<string | null>{
        return await this.confirmationMessage.textContent();
    }

    async clickContinue(): Promise<void>{
        await this.continueButton.click();
    }

    async clickLogout(): Promise<LoginPage>{
        await this.headerComponent.clickLogout();
        return new LoginPage(this.page);
    }

    async addProductByNumberOrder(order: number): Promise<void>{
        await this.productComponent.addProductByNumberOrder(order);
    }
}