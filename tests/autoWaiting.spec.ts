import {test, expect} from "@playwright/test";


test.beforeEach(async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async ({page}) => {
    const successMessage = page.locator('.bg-success')
    // await successMessage.click()

    // const message = await successMessage.textContent()

    // await successMessage.waitFor({state: "attached"})
    // const message = await successMessage.allTextContents()
    
    // expect(message).toEqual('Data loaded with AJAX get request.')
    // expect(message).toContain('Data loaded with AJAX get request.')
    

    await expect(successMessage).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

})

test('alternatives waits', async ({page}) => {
    const successMessage = page.locator('.bg-success')
    await successMessage.click()
    const message = await successMessage.allTextContents()

    // wait for element:
    // await page.waitForSelector('.bg-success')

    // wait for a particular response:
    await page.waitForRequest('http://uitestingplayground.com/ajaxdata')

    // wait for network calls to be completed: (NOT RECOMMENDED)
    await page.waitForLoadState('networkidle')

    expect(message).toContain('Data loaded with AJAX get request.')
})


