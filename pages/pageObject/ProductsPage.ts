import { Page, expect, Locator} from '@playwright/test';
import { ProductDetailPage } from './ProductDetailPage';
import { CartPage } from './CartPage';
import { ProductComponent } from '@pages/components/ProductComponent';
import { CartConfirmationDialog } from '@pages/components/CartConfirmationDialog';

export class ProductsPage{
    private readonly page: Page;
    private readonly productComponent: ProductComponent;
    readonly cartConfirmationDialog: CartConfirmationDialog;
    private readonly productList: Locator;
    private readonly viewProductList: Locator;
    private readonly searchBar: Locator;
    private readonly searchButton: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.productComponent = new ProductComponent(page);
        this.cartConfirmationDialog = new CartConfirmationDialog(page);
        this.productList = page.locator(".product-image-wrapper ");
        //this.viewProductList = page.locator("//div[@class='product-image-wrapper']//a[normalize-space()='View Product']");
        this.viewProductList = page.locator("div.product-image-wrapper").getByRole("link", { name: "View Product" });
        this.searchBar = page.locator("#search_product");
        this.searchButton = page.locator("#submit_search");
    }

    async isProductVisible(): Promise<boolean>{
        return await this.productList.first().isVisible();
    }

    async viewProductByNumber(order: number): Promise<ProductDetailPage>{
        const listProduct = await this.viewProductList.count();
        if (order < 1 || order > listProduct){
            throw new Error(`Your number is ${order}, but it must be between 1 and ${listProduct}`)
        } else {
            for(let i=0; i < listProduct; i++){
                if(i === order){
                    await this.viewProductList.nth(i-1).click();
                }
            }
        }
        return new ProductDetailPage(this.page);
    }

    async searchProduct(productName: string): Promise<void>{
        await this.searchBar.fill(productName);
        await this.searchButton.click();
        await this.page.waitForLoadState('load');
    }

    async isProductNameExists(productName: string): Promise<boolean>{
        return await this.productComponent.isProductNameExists(productName);
    }

    async addProductByNumberOrder(order: number): Promise<void>{
        await this.productComponent.addProductByNumberOrder(order);
    }
}