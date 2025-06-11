import {test} from "@playwright/test";

/* // A test suite is a way to grouping test.
test.describe('test suite name', () => {
    
    // This is a test.
    test('test name', () => {

    })
}) */

// beforeEach hook help us with repetitive test steps, it will run before each test.
// On playwright there are 4 hooks: beforeAll, beforeEach, afterAll & afterEach.
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
})

// The page fixture is necessary to playwright interacts with the page to run tests.   
test('testCase_001 - navigate to form layouts page', async ({page}) => {
    await page.getByText('Form Layouts').click()
}) 

test('testCase_002 - navigate to date picker page', async ({page}) => {
    await page.getByText('Datepicker').click()
})
