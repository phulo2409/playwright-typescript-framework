import {Page, expect, Locator} from '@playwright/test'
import { CartConfirmationDialog } from './CartConfirmationDialog';

export class ProductDetailPage extends CartConfirmationDialog{
    private readonly productName: Locator;
    private readonly category: Locator;
    private readonly price: Locator;
    private readonly quantity: Locator;
    private readonly availability: Locator;
    private readonly condition: Locator;
    private readonly brand: Locator;
    private readonly addButton: Locator;


    constructor(page: Page){
        super(page);
        this.productName = page.locator("div.product-information h2");
        this.category = page.locator("div.product-information p:has-text('Category:')");
        this.price = page.getByText("Rs");
        this.quantity = page.locator("#quantity");
        this.availability = page.locator("p:has-text('Availability:')")
        this.condition = page.locator("p:has-text('Condition:')")
        this.brand = page.locator("p:has-text('Brand:')")
        this.addButton = page.locator("button.cart");
    }

    async isProductNameVisible(): Promise<boolean>{
        return await this.productName.isVisible();
    }

    async isCategoryVisible(): Promise<boolean>{
        return await this.category.isVisible();
    }

    async isPriceVisible(): Promise<boolean>{
        return await this.price.isVisible();
    }

    async isAvailabilityVisible(): Promise<boolean>{
        return await this.availability.isVisible();
    }

    async isConditionVisible(): Promise<boolean>{
        return await this.condition.isVisible();
    }

    async isBrandVisible(): Promise<boolean>{
        return await this.brand.isVisible();
    }

    async enterQuantity(qnumber: string): Promise<void>{
        await this.quantity.clear();
        await this.quantity.fill(qnumber);
    }

    async clickAddToCart(): Promise<void>{
        await this.addButton.click();
    }
}