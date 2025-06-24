import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {

    // readonly page: Page

    readonly formLayoutsMenuItem: Locator
    readonly datapickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page) {
        super(page)
        
        this.formLayoutsMenuItem = page.getByText('Form Layouts')
        this.datapickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem = page.getByText('Smart Table')
        this.toastrMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip')
    }

    async formLayoutsPage() {
        // await this.page.getByText('Forms').click()
        await this.selectGroupMenuItem('Forms')
        // await this.page.waitForTimeout(1000)
        await this.formLayoutsMenuItem.click()
        await this.waitForNumberOfSeconds(1)
    }

    async datapickerPage() {
        // await this.page.getByText('Forms').click()
        await this.selectGroupMenuItem('Forms')
        // await this.page.waitForTimeout(1000)
        await this.datapickerMenuItem.click()
        await this.waitForNumberOfSeconds(1)
    }

    async smartTablePage() {
        // await this.page.getByText('Tables & Data').click()
        await this.selectGroupMenuItem('Tables & Data')
        // await this.page.waitForTimeout(1000)
        await this.smartTableMenuItem.click()
        await this.waitForNumberOfSeconds(1)
    }

    async toastrPage() {
        // await this.page.getByText('Modal & Overlays').click()
        await this.selectGroupMenuItem('Modal & Overlays')
        // await this.page.waitForTimeout(1000)
        await this.toastrMenuItem.click()
        await this.waitForNumberOfSeconds(1)
    }

    async tooltipPage() {
        // await this.page.getByText('Modal & Overlays').click()
        await this.selectGroupMenuItem('Modal & Overlays')
        // await this.page.waitForTimeout(1000)
        await this.tooltipMenuItem.click()
        await this.waitForNumberOfSeconds(1)
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute("aria-expanded")

        if (expandedState == "false") {
            await groupMenuItem.click()
        }
    }
}