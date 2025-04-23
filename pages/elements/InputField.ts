import { expect, type Locator, type Page } from '@playwright/test';

export class InputField {
    protected root: Locator;
    protected input: Locator;
    protected label: Locator;
    protected errorMessage: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.input = root.locator('input');
        this.label = root.locator('label');
        this.errorMessage = root.locator('div');
    }

    async type(value: string): Promise<void> {
        await this.input.fill(value);
    }

    async getLabelText(): Promise<string> {
        return await this.label.textContent();
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent();
    }

    async isInvalid(): Promise<boolean> {
        return await this.input.getAttribute('aria-invalid') === 'true';
    }
}
