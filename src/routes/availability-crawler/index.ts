import express from 'express';
import { AvailabilityResponse } from '../../api/azul/availability.types.js';
import { getCheapestRoundTripJourneyPrices } from '../../api/azul/availability.js';
import { saveFlightsToDatabase } from '../../database/flight/model/index.js';
import { addTimestamp } from '../../utils/date/add-timestamp.js';

const router = express.Router();

router.post('/extract', (req, res) => {
    const availabilityJson: AvailabilityResponse = req.body;

    if (!req.body || !req.body.data) {
        res.status(400).json({ message: 'Bad payload' });
        return;
    }

    // here you can send the next url or just tell the browser script to stop
    res.status(200).json(getCheapestRoundTripJourneyPrices(availabilityJson));
});

router.post('/extract-and-save', async (req, res) => {
    const availabilityJson: AvailabilityResponse = req.body;

    if (!req.body || !req.body.data) {
        res.status(400).json({ message: 'Bad payload' });
        return;
    }

    const cheapestJourneys =
        getCheapestRoundTripJourneyPrices(availabilityJson);

    const result = await saveFlightsToDatabase(
        Object.values(cheapestJourneys).map(addTimestamp),
    );

    // here you can send the next url or just tell the browser script to stop
    res.status(200).json({ message: result });
});

export { router };
