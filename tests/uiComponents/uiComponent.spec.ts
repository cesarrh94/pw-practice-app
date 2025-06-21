import {test, expect } from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})


test.describe('form layout page', () => {

    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('001 - input fields', async ({page}) => {
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

    test('002 - radio buttons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'})
        // const radioButton = usingTheGridForm.getByLabel('Option 1')
        let radioButton = usingTheGridForm.getByRole('radio', {name: 'Option 1'})
        await radioButton.check({force: true})

        const statusRadioButton = await radioButton.isChecked() 

        // general assertion
        expect(statusRadioButton).toBeTruthy()

        // locator assertion
        await expect(radioButton).toBeChecked()

        radioButton = usingTheGridForm.getByRole('radio', {name: 'Option 2'})
        await radioButton.check({force: true})
        
        expect(await radioButton.isChecked()).toBeTruthy()
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
    })
})


test('003 - checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true})

    const checkboxes = page.getByRole('checkbox')
    for (const checkbox of await checkboxes.all()) {
        // await checkbox.uncheck({force: true})
        // expect(await checkbox.isChecked()).toBeTruthy()
        await checkbox.uncheck({force: true})
        expect(await checkbox.isChecked()).toBeFalsy()
    }
})


test('004 - lists and dropdowns', async ({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    /*
    page.getByRole('list') // for unordered list
    page.getByRole('listitem') // for ordered list
     */

    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])

    await optionList.filter({hasText: 'Cosmic'}).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        'Light': 'rgb(255, 255, 255)',
        'Dark': 'rgb(34, 43, 69)',
        'Cosmic': 'rgb(50, 50, 89)',
        'Corporate': 'rgb(255, 255, 255)'
    }

    await dropDownMenu.click()
    for (const color in colors) {
        await optionList.filter({'hasText': color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        await dropDownMenu.click()
    }
})


test('005 - tooltip', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await toolTipCard.getByRole('button', {name: 'Top'}).hover()

    const toolTip = await page.locator('nb-tooltip').textContent()
    expect(toolTip).toEqual('This is a tooltip')
})


test('006 - dialog boxes', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})

test('007 - web tables', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // 1. how to get the row by any text in this row
    const targetRow = page.getByRole('row', {name: 'twitter@outlook.com'})
    await targetRow.locator('.nb-edit').click()

    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('30')
    await page.locator('.nb-checkmark').click()

    // 2. how to get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('mytest-1@mytest.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('mytest-1@mytest.com')

    // 3. test the filter of the table
    const ages = ['20', '30', '40', '200'] 

    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)

        await page.waitForTimeout(1000)
        
        const ageRows = page.locator('tbody tr')
        
        for (let row of await ageRows.all()) {
            const cellValue =  await row.locator('td').last().textContent()

            if (age == '200') {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }

})

test('008 - datepicker', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    const date = new Date()
    date.setDate(date.getDate() + 200)
    const expectedDate = date.getDate().toString()
    console.log('log here: ', expectedDate)
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    console.log('log here: ', expectedMonthShort)
    const expectedYear = date.getFullYear()
    console.log('log here: ', expectedYear)
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
    while(!calendarMonthYear.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron right"]').click()
        calendarMonthYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
    await expect(calendarInputField).toHaveValue(dateToAssert)

})
