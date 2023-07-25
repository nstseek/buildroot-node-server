import { chromium } from 'playwright';

(async () => {
  // Specify the path to your local Chrome data directory
  const userDataDir = '/path/to/your/local/chrome/data';

  // Launch the browser with the userDataDir option
  const browser = await chromium.launchPersistentContext(userDataDir);

  // Create a new page
  const page = await browser.newPage();

  // Navigate to a URL
  await page.goto('https://example.com');

  // Perform your actions on the page using Playwright APIs
  // ...

  // Close the browser
  await browser.close();
})();