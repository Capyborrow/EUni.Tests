import { Page, expect } from '@playwright/test';

export class BasePage {
    protected page: Page;
    protected static baseUrl = 'http://localhost:5174';

    constructor(page: Page) {
        this.page = page;
    }

    async goto(path: string = '/') {
        await this.page.goto(`${BasePage.baseUrl}${path}`);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async expectTitleToBe(expected: string): Promise<void> {
        await expect(this.page).toHaveTitle(expected);
    }

    async reload(): Promise<void> {
        await this.page.reload();
    }

    async goBack(): Promise<void> {
        await this.page.goBack();
    }

    async goForward(): Promise<void> {
        await this.page.goForward();
    }

    async hasText(text: RegExp | string): Promise<boolean> {
        const pageText = await this.page.textContent('body');
        if (!pageText) return false;

        return typeof text === 'string'
            ? pageText.includes(text)
            : text.test(pageText);
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}