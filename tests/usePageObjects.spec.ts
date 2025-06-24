import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";


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
    
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test1@gmail.com', 'password1', 'option 1')
    await pm.onFormLayoutsPage().submitInlineFormWithNameAndEmail('test2@gmail.com', 'Password2', true)

    await pm.navigateTo().datapickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerFromToday(5)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(3, 6)
})