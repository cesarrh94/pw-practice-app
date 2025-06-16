import {test, expect } from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})


test.describe('form layout page', () => {

    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('001 - input fields', async({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'})
        const emailField = usingTheGridForm.getByRole('textbox', {name: 'email'})

        await emailField.fill('test@test.com')
        await emailField.clear()
        // this method simulates press the keyboard to type.
        await emailField.pressSequentially('test2@test2.com', {delay: 300})

        // generic assertion
        // this method extract the actual value type on the input field
        const inputValue = await emailField.inputValue()
        expect(inputValue).toEqual('test2@test2.com')

        // locator assertion
        await expect(emailField).toHaveValue('test2@test2.com')
    })
})
