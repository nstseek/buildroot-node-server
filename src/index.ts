import { chromium } from "playwright";
import { WhatsappWeb } from "./page-object/whatsapp-web.js";

(async () => {
    // defining userDataDir
    const userDataDir = `C:\\Users\\NSTSeek\\AppData\\Local\\Google\\Chrome\\User Data`;

    // opening browser
    const browser = await chromium.launchPersistentContext(userDataDir, { headless: false });

    // creating page
    const page = await browser.newPage();

    // navigating to whatsapp web
    await page.goto('https://web.whatsapp.com/');

    // creating page object
    const whatsappPage = new WhatsappWeb(page);

    // accessing group
    await whatsappPage.selectGroupOrConversation('Cornos cada um na sua casa e acabou a amizade');
    
    // mentioning someone on the message
    await whatsappPage.mentionSomeone('Vitão da Sayuri');

    // adding some text
    await whatsappPage.inputText('eoque');

    // sending the message
    await whatsappPage.send();

    // closing the browser after a while so the message has enough time to be sent
    setTimeout(() => {
        browser.close();
    }, 5000);
})();