const {Builder, Browser} = require('selenium-webdriver');

export async function helloSelenium() {
  try {
    const driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .build();
  
    if (!driver) {
      throw new Error('Failed to create driver');
    }
  
    await driver.get('https://selenium.dev');
    await driver.quit();
  
    return true;
  } catch (error) {
    console.error('Error in helloSelenium:', error);
    return false;
  }
};
