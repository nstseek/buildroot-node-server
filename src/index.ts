import { chromium } from "playwright";

(async () => {
    const userDataDir = `C:\\Users\\NSTSeek\\AppData\\Local\\Google\\Chrome\\User Data`;

    const browser = await chromium.launchPersistentContext(userDataDir, { headless: false });

    const page = await browser.newPage();

    // recording

    await page.goto('https://web.whatsapp.com/');
    await page.getByText('Cornos cada um na sua casa e acabou a amizade').click();


    for (let i = 0; i < 100; i++) {
        await page.getByTestId('conversation-compose-box-input').type('@v');
        await page.getByRole('button', { name: 'Vitão da Sayuri', exact: true }).click();
        await page.getByTestId('compose-btn-send').click();
    }

    // end of records
})();