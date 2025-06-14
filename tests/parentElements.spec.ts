import {test, expect} from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('locating parent elements', async ({page}) => {
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).click()

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Password'}).click()

    await page.locator('nb-card')
        .filter({has: page.locator('nb-checkbox')})
        .filter({hasText: 'Sign in'})
        .getByRole('textbox', {name: 'Email'})
        .click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: 'Email'}).click()
})

test('reusing locators', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    const passwordField = basicForm.getByRole('textbox', {name: 'Password'})
    const checkbox = basicForm.locator('nb-checkbox')
    const submitButton = basicForm.getByRole('button')

    await emailField.fill('test@test.com')
    await passwordField.fill('Password123.')
    await checkbox.click()
    await submitButton.click()

    expect(emailField).toHaveValue('test@test.com')
})
