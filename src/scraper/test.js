const puppeteer = require('puppeteer');

export async function helloSelenium() {
    const url = 'https://karir.com/search-lowongan?keyword=Front%20End%20Developer';
    let result = {};

    try {
        // Launch a headless browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // Navigate to the URL
        await page.goto(url);
        
        // Wait for the '.side_categories' element to ensure the page is fully loaded
        await page.waitForSelector('.container');

        // Extract data using Puppeteer's evaluate function
        result = await page.evaluate(() => {
            let data = {};
            // Find all elements with class 'side_categories'
            document.querySelectorAll('.container').forEach((element) => {
                let text = element.textContent.trim();
                // let urlpath = element.getAttribute('href').trim().replace('../', '');
                // // Skip 'Books' and 'Erotica'
                // if (text !== "Books" && text !== "Erotica") {
                //     data[text] = urlpath;
                // }
                data[text] = text;
            });
            return data;
        });
        
        // Close the browser
        await browser.close();
        
    } catch (error) {
        console.error('Error in scraping:', error);
        return false;
    }

    return result;
}
