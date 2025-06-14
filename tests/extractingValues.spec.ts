import {test, expect} from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('extracting values of page', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})

    // get single text value
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // get all text values
    const allRadioButtons = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtons).toContain('Option 1')

    // get input value 
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField.fill('test@test123.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test123.com')

    // get attribute value
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')

})