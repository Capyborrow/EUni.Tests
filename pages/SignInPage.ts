import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import {InputField} from "./elements/InputField";
import {PasswordInputField} from "./elements/PasswordInputField";

export class SignInPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly emailInputError: Locator;
    readonly passwordInputError: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        super(page);

        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole('button', { name: 'Sign in' });

        this.emailInputError = page.getByText('Email*Required field');
        this.passwordInputError = page.getByText('Password*Required fieldForgot');
    }

    async open() {
        await this.goto('/signin');
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickSignIn() {
        await this.signInButton.click();
    }
    // async getEmailError(): Promise<string | null> {
    //     return this.emailInput.getErrorMessage();
    // }
    //
    // async getPasswordError(): Promise<string | null> {
    //     return this.passwordInput.getErrorMessage();
    // }
}
