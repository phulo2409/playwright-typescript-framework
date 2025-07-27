import { Page } from '@playwright/test';

export async function blockImage(page: Page){
    await page.route('**/*', (route) => {
        const request = route.request();
        if(request.resourceType() === 'image'){
            route.abort();
        } else {
            route.continue();
        }
    });
}
export async function blockImagesAndCSS(page: Page){
    await page.route('**/*', (route) => {
        const request = route.request();
        if(request.resourceType() === 'image' || request.resourceType() === 'stylesheet'){
            route.abort();
        } else {
            route.continue();
        }
    });
}

export async function blockImages(page: Page){
    await page.route('**/*.{png,jpg,jpeg,svg,gif,webp}', route => {
        route.abort(); // Hủy request image
    });
}