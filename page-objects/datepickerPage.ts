import { Page, expect } from "@playwright/test"

export class DatepickerPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async selectCommonDatePickerFromToday(numbersOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('form picker')
        await calendarInputField.click()
        
        const dateToAssert = await this.selectDateInTheCalendar(numbersOfDaysFromToday)

        await expect(calendarInputField).toHaveValue(dateToAssert)

    }

    async selectDatepickerWithRangeFromToday(startDateFromToday: number, endDateFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('range picker')
        await calendarInputField.click()

        const dateToAssertStart = await this.selectDateInTheCalendar(startDateFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDateFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`

        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalendar(numbersOfDaysFromToday) {
        let date = new Date()
        date.setDate(date.getDate() + numbersOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
        while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()

        return dateToAssert
    }

}