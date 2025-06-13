import {test} from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// the locator is a general method in playwright that help us to find 
// the web elements on the page.
test('locator syntax rules', async ({page}) => {
    page.locator('input') // by tagName
    page.locator('#inputEmail1') // by id value
    page.locator('.shape-rectangle') // by className value
    page.locator('[placeholder="Email"]') // by attribute value
    page.locator(':text("Using")') // by partial text match
    page.locator(':text-is("Using the Grid")') // by exact text match
    page.locator('//*[@id="inputEmail"]') // by XPATH value - (not recommended)

    // by fullClassName value
    page.locator('[input-full-width size-medium status-basic shape-rectangle nb-transition]')

    // combining different selectors
    page.locator('input [placeholder="Email"]')

})


