import { Flight } from '../../database/flight/schema/index.js';
import { getDb } from './get-db.js';

export const getAzulFlightsCollection = () =>
    getDb().collection<Flight>('flights');
