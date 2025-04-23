import { expect, type Locator, type Page } from '@playwright/test';
import { InputField } from './InputField';

export class PasswordInputField extends InputField {
    private hintText: Locator;
    private restoreLink: Locator;

    constructor(root: Locator) {
        super(root);
        this.hintText = root.locator('#field-r7__hint');
        this.restoreLink = this.hintText.locator('a');
    }

    async getHintText(): Promise<string | null> {
        return await this.hintText.textContent();
    }

    async clickRestoreLink(): Promise<void> {
        await this.restoreLink.click();
    }

    async isRestoreLinkVisible(): Promise<boolean> {
        return await this.restoreLink.isVisible();
    }
}