import { getAzulFlightsCollection } from '../../../utils/mongodb/get-azul-flights-collection.js';
import { Flight } from '../schema/index.js';

export const saveFlightToDatabase = (flight: Flight) =>
    getAzulFlightsCollection().insertOne(flight);

export const saveFlightsToDatabase = (flights: Flight[]) =>
    getAzulFlightsCollection().insertMany(flights);
