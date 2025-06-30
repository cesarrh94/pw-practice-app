import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker"


test.beforeEach(async ({page}) => {
    page.goto('http://localhost:4200/')
})

test('navigate to form page', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datapickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})


test('paramterized methods example', async ({page}) => {
    const pm = new PageManager(page)

    // test data generation:
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const fullName = `${firstName} ${lastName}`
    const randomNumer = faker.number.int(100)
    const email = `${firstName}${lastName}${randomNumer}@testmail.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test1@gmail.com', 'password1', 'option 1')
    await pm.onFormLayoutsPage().submitInlineFormWithNameAndEmail(fullName, email, true)

    await pm.navigateTo().datapickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerFromToday(5)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(3, 6)
})