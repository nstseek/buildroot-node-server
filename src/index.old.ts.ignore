import { chromium } from 'playwright';
import { makeSelecaoVooUrl } from './utils/url-maker/selecao-voo.js';
import {
    availabilityRoute,
    getCheapestRoundTripJourneyPrices,
} from './api/azul/availability.js';
import { AvailabilityResponse } from './api/azul/availability.types.js';

// TODO: check why the token request is returning a 403 sometimes
// this availability request has an auth token
// the website first hits a token endpoint to get an auth token
// then it uses this auth token to authenticate further requests
// i'm trying to figure out why does the token endpoint returns 403 sometimes
// you don't need to be logged in to get the token
// i'm supposing that it has something to do with the cookies or headers in the request
// the token request uses POST method but has no body

(async () => {
    // defining userDataDir
    const userDataDir = `C:\\Users\\NSTSeek\\AppData\\Local\\Google\\Chrome\\User Data`;

    // opening browser
    const browser = await chromium.launchPersistentContext(userDataDir, {
        headless: false,
    });

    // creating page
    const page = await browser.newPage();

    await page.goto('https://www.voeazul.com.br/br/pt/home.html');

    await new Promise((resolve) => setTimeout(() => resolve(null), 5000));

    // navigating to selecao voo azul
    await page.goto(
        makeSelecaoVooUrl({
            originAirport: 'POA',
            destinyAirport: 'SAO',
            departureDate: { day: 29, month: 9, year: 2023 },
            returnDate: { day: 30, month: 9, year: 2023 },
        }),
    );

    await page.route(availabilityRoute, async (route) => {
        // Continue the request and wait for its response
        try {
            const response = await route.fetch();

            const availabilityJson =
                (await response.json()) as AvailabilityResponse;

            console.log(getCheapestRoundTripJourneyPrices(availabilityJson));

            route.fulfill({ json: availabilityJson });
        } catch (err) {
            console.log(err);
        }
    });
})();
