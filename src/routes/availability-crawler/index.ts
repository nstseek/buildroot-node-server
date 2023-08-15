import express, { Request, Response } from 'express';
import { AvailabilityResponse } from '../../api/azul/availability.types.js';
import { getCheapestRoundTripJourneyPrices } from '../../api/azul/availability.js';
import { saveFlightsToDatabase } from '../../database/flight/model/index.js';
import { addTimestamp } from '../../utils/date/add-timestamp.js';
import {
    AvailabilityCrawlerResponse,
    makeResponse,
} from './schema/response.js';
import {
    validateAvailabilityData,
    validateCheckFlightData,
} from './schema/body.js';
import { AvailabilityParams } from './schema/params.js';

const router = express.Router();

router.post(
    '/extract',
    (
        req: Request<AvailabilityParams>,
        res: Response<AvailabilityCrawlerResponse>,
    ) => {
        const availabilityJson: AvailabilityResponse = req.body;

        if (!validateAvailabilityData(req.body)) {
            res.status(400).json(
                makeResponse({
                    message: 'Bad payload',
                }),
            );
            return;
        }

        const cheapestJourneys =
            getCheapestRoundTripJourneyPrices(availabilityJson);

        // here you can send the next url or just tell the browser script to stop
        res.status(200).json(
            makeResponse({
                data: Object.values(cheapestJourneys).map(addTimestamp),
                message: 'Data extracted successfully!',
            }),
        );
    },
);

router.post(
    '/extract-and-save',
    async (req, res: Response<AvailabilityCrawlerResponse>) => {
        const availabilityJson: AvailabilityResponse = req.body;

        if (!validateAvailabilityData(req.body)) {
            res.status(400).json(makeResponse({ message: 'Bad payload' }));
            return;
        }

        const cheapestJourneys =
            getCheapestRoundTripJourneyPrices(availabilityJson);

        const cheapestFlights =
            Object.values(cheapestJourneys).map(addTimestamp);

        await saveFlightsToDatabase(cheapestFlights);

        // here you can send the next url or just tell the browser script to stop
        res.status(200).json(
            makeResponse({
                message: 'Data extracted and saved successfully!',
                data: cheapestFlights,
            }),
        );
    },
);

router.post('/check-flight', (req, res) => {
    if (!validateCheckFlightData(req.body)) {
        res.status(400).json(makeResponse({ message: 'Bad payload' }));
        return;
    }
});

export { router };
