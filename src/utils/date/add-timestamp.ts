import { Flight } from '../../database/flight/schema/index.js';

export const addTimestamp = function <T>(
    obj: T,
): T & Pick<Flight, 'createdAt'> {
    return {
        ...obj,
        createdAt: new Date(),
    };
};
