import express from 'express';
import { router as AvailabilityCrawlerRouter } from './availability-crawler/index.js';

const router = express.Router();

router.get('/', (_, res) => {
    res.status(200).json({ message: 'Server listening' });
});

router.use('/availability-crawler', AvailabilityCrawlerRouter);

export { router };
