import {test, expect} from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('working with assertions', async ({page}) => {
    // playwright has 2 types of assertions: general and locator

    // general assertion, this assetions dont wait
    const myValue = 5
    expect(myValue).toEqual(5)

    const basicFormButton = page.locator('nb-card')
        .filter({hasText: "Basic form"})
        .locator('button')

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')
    
    // locator assertion, it will wait 5 seconds in order to check for the element
    await expect(basicFormButton).toHaveText('Submit')

    // soft assertion, is a kind of assertion that if it failed, the execution can continue.
    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()

})