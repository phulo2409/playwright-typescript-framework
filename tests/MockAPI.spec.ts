import {test, expect} from '@playwright/test';

test('Mock API Test', async ({ page }) => {
    // Intercept the API request and mock the response
    await page.route('https://automationexercise.com/api/contact_us', async route => {
        const mockResponse = {
            status: 'success',
            message: 'Your details have been submitted successfully.'
        };
        await route.fulfill({
            json: mockResponse,
            status: 200
        });
    });

    // Navigate to the contact us page
    await page.goto('https://automationexercise.com/contact_us');

    // Fill out the contact form
    await page.waitForTimeout(5000);
})