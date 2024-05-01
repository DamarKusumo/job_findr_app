const axios = require('axios');
const cheerio = require('cheerio');

export async function helloSelenium() {
    const url = 'https://books.toscrape.com/';
    let result = {};

    try {
        // Fetch the HTML content of the page
        const response = await axios.get(url);
        const html = response.data;

        // Load the HTML content into Cheerio
        const $ = cheerio.load(html);

        // Find all elements with class 'side_categories'
        $('.side_categories ul li a').each((index, element) => {
            let text = $(element).text().trim();
            let urlpath = $(element).attr('href').trim().replace('../', '');
            
            // Skip 'Books' and 'Erotica'
            if (text === "Books" || text === "Erotica") {
                return;
            }

            result[text] = urlpath;
        });
    } catch (error) {
        console.error('Error in scraping:', error);
        return false;
    }

    return result;
}
