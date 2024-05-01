const { Builder, Browser, By } = require('selenium-webdriver');

export async function helloSelenium() {
    const url = 'https://books.toscrape.com/';
    let result = {};
    let driver;

    try {
        driver = await new Builder()
            .forBrowser(Browser.CHROME)
            .build();

        if (!driver) {
            throw new Error('Failed to create driver');
        }

        await driver.get(url);
        let categories = await driver.findElements(By.className('side_categories'));

        for (let category of categories) {
            let links = await category.findElements(By.css('ul li a'));
            for (let link of links) {
                let text = await link.getText();
                if (text === "Books" || text === "Erotica") {
                    continue;
                }
                let urlpath = await link.getAttribute("href");
                if (!urlpath) {
                    throw new Error(`Failed to get href attribute for link: ${text}`);
                }
                urlpath = urlpath.trim().replace("../", "");
                result[text] = urlpath;
            }
        }
    } catch (error) {
        console.error('Error in helloSelenium:', error);
        return false;
    } finally {
        if (driver) { 
            await driver.quit();
        }
    }

    return result;
};