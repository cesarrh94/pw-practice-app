import {test, expect} from "@playwright/test";

test.beforeEach(async ({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})


test('learning about timeouts', async ({page}) => {
    test.setTimeout(10000)
    test.slow()
    const successMessage = page.locator('.bg-success')
    // await successMessage.click({timeout: 16000})
    await successMessage.click()

})