import {test} from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('locating child elements', async ({page}) => {
    const radioButton = page.locator('nb-card-body nb-radio :text-is("Option 1")')
    await radioButton.click()

    await page.locator('nb-card')
        .locator('nb-card-body')
        .locator('form')
        .locator('div')
        .locator('nb-radio-group')
        .locator('nb-radio')
        .locator(':text-is("Option 2")')
        .click()

    await page.locator('nb-card')
        .getByRole('button', {name: 'Sign In'})
        .first()
        .click()

    await page.locator('nb-card').nth(1)
        .getByRole('button', {name: 'Sign In'})
        .click()
})
