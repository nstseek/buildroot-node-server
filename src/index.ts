import { chromium } from 'playwright';
import { makeSelecaoVooUrl } from './utils/url-maker/selecao-voo.js';
import {
    availabilityRoute,
    findCheapestJourney,
    findJourneyByFlightNumber,
    findJourneyPrice,
    getCheapestJourney,
    getJourneyPrices,
} from './api/azul/availability.js';
import { ResponseMock } from './mock.js';
import { Journey } from './api/azul/availability.types.js';

console.log(
    findJourneyPrice(
        getCheapestJourney(ResponseMock.data.trips[0].journeys as any)!,
    ),
);

// (async () => {
//     // defining userDataDir
//     const userDataDir = `C:\\Users\\NSTSeek\\Playwright\\Azul\\User Data`;

//     // opening browser
//     const browser = await chromium.launchPersistentContext(userDataDir, {
//         headless: false,
//     });

//     // creating page
//     const page = await browser.newPage();

//     // navigating to selecao voo azul
//     await page.goto(
//         makeSelecaoVooUrl({
//             originAirport: 'POA',
//             destinyAirport: 'SAO',
//             departureDate: { day: 15, month: 8, year: 2023 },
//             returnDate: { day: 16, month: 8, year: 2023 },
//         }),
//     );

//     await page.route(availabilityRoute, async (route) => {
//         // Continue the request and wait for its response
//         const response = await route.fetch();

//         // Read the response body
//         console.log(JSON.stringify(await response.json()));
//     });
// })();
