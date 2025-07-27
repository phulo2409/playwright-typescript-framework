import { Page, expect, Locator} from '@playwright/test';

export class ContactUs{
    private readonly page: Page;
    private readonly title: Locator;
    private readonly nameTextbox: Locator;
    private readonly emailTextbox: Locator;
    private readonly subjectTextbox: Locator;
    private readonly messageTextare: Locator;
    private readonly uploadFileButton: Locator;
    private readonly submitButton: Locator;
    private readonly successMsg: Locator;

    constructor(page: Page){
        this.page = page;
        this.title = page.getByText("Get In Touch");
        this.nameTextbox = page.getByPlaceholder("Name");
        this.emailTextbox = page.locator("input[data-qa='email']");
        this.subjectTextbox = page.getByPlaceholder("Subject");
        this.messageTextare = page.getByPlaceholder("Your Message Here");
        this.uploadFileButton = page.locator("[name='upload_file']");
        this.submitButton = page.getByRole("button", { name: "submit" });
        this.successMsg = page.locator("div.contact-form .alert-success")
    }

    async isTitleVisible(): Promise<boolean>{
        return await this.title.isVisible();
    }

    async enterName(name: string): Promise<void>{
        await this.nameTextbox.fill(name);
    }

    async enterEmail(email: string): Promise<void>{
        await this.emailTextbox.fill(email);
    }

    async enterSubject(subject: string): Promise<void>{
        await this.subjectTextbox.fill(subject);
    }

    async enterMessage(message: string): Promise<void>{
        await this.messageTextare.fill(message);
    }

    async uploadFile(filePath: string | string[]): Promise<void>{
        await this.uploadFileButton.setInputFiles(filePath);
    }

    async clickSubmit(): Promise<void>{
        this.page.on('dialog', async dialog =>{
            await dialog.accept();
        });
        
        await this.submitButton.click();
    }

    async getSuccessMessage(): Promise<string | null>{
        return await this.successMsg.textContent();
    }
}