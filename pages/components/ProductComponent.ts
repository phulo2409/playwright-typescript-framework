import { Page, expect, Locator} from '@playwright/test';

export class ProductComponent {
    private readonly productNameInfo: Locator;
    private readonly addToCartListButton: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly viewCartLink: Locator;

    constructor(private page: Page) {
        this.productNameInfo = page.locator(".productinfo p");
        this.addToCartListButton = page.locator(".product-overlay .add-to-cart");
        this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
        this.viewCartLink = page.getByRole("link", { name: "View Cart" });
    }

    async isProductNameExists(productName: string): Promise<boolean>{
        const productList = await this.productNameInfo.allTextContents();
        return productList.some(product =>
            product.toLowerCase().includes(productName.toLowerCase())
        );
    }

    async addProductByNumberOrder(order: number): Promise<void>{
        const listProduct = await this.addToCartListButton.count();
        if (order < 1 || order > listProduct){
            throw new Error(`Your number is ${order}, but it must be between 1 and ${listProduct}`)
        } else {
            for(let i=0; i <= listProduct; i++){
                if(i === order){
                    await this.productNameInfo.nth(i-1).hover();
                    await this.addToCartListButton.nth(i-1).click();
                }
            }
        }
    }

    async clickContinueShopping(): Promise<void>{
        await this.continueShoppingButton.click();
    }

    async clickViewCart(): Promise<void>{
        await this.viewCartLink.click();
        await this.page.waitForLoadState('load');
    }
}