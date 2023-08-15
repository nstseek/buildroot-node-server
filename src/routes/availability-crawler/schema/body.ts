import { AvailabilityResponse } from '../../../api/azul/availability.types.js';
import { DateObject } from '../../../utils/date/date-object.js';

export const validateAvailabilityData = (
    body: any,
): body is AvailabilityResponse => {
    if (!body || !body.data) {
        return false;
    }
    return true;
};

const validateAirportName = (airportName: any) => {
    return typeof airportName === 'string' && airportName.length === 3;
};

const validateDateObject = (dateObject: any): dateObject is DateObject => {
    return (
        typeof dateObject?.day === 'number' &&
        typeof dateObject?.month !== 'number' &&
        typeof dateObject?.year === 'number'
    );
};

export const validateCheckFlightData = (body: any): body is CheckFlight => {
    return (
        validateAirportName(body?.destinyAirport) &&
        validateAirportName(body?.originAirport) &&
        validateDateObject(body.departureDate) &&
        validateDateObject(body?.returnDate)
    );
};

export type CheckFlight = {
    originAirport: string;
    destinyAirport: string;
    departureDate: DateObject;
    returnDate: DateObject;
};
