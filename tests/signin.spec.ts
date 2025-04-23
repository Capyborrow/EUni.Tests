import { test as base, expect } from '@playwright/test';
import { SignInPage } from '../pages/SignInPage';

const test = base.extend<{
    signInPage: SignInPage;
}>({
    signInPage: async ({ page }, use) => {
        const signInPage = new SignInPage(page);
        await signInPage.goto('/signin');
        await use(signInPage);
    }
});

test.describe.parallel('Sign In Page Tests', () => {

    test('Empty fields should trigger validation errors', async ({ signInPage }) => {
        await signInPage.clickSignIn();
        const error = await signInPage.hasText('Required field');
        expect(error).toBeTruthy();
    });

    test('Invalid email should show an error message', async ({ signInPage }) => {
        await signInPage.fillEmail('invalid-email');
        await signInPage.fillPassword('somePass123');
        await signInPage.clickSignIn();
        const error = await signInPage.hasText('Invalid email address');
        expect(error).toBeTruthy();
    });

    test('Valid input but unregistered should not show any errors', async ({ signInPage }) => {
        await signInPage.fillEmail('test@example.com');
        await signInPage.fillPassword('StrongPass123!');
        await signInPage.clickSignIn();
        const error = await signInPage.hasText('Invalid email address')
        || await signInPage.hasText('Required field');
        expect(error).toBeFalsy();
        expect(signInPage.hasText('User not found.')).toBeTruthy();
    });

    test('Valid input of registered user should return on main page', async({ signInPage }) => {
        await signInPage.fillEmail('admin@gmail.com');
        await signInPage.fillPassword('admineuni');
        await signInPage.clickSignIn();
        let result = await signInPage.getCurrentUrl();
        expect(result).toMatch('http://localhost:5174');
    })
});
