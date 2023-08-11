export type Flight = {
    flightNumber: string;
    duration: {
        days: number;
        hours: number;
        minutes: number;
    };
    points: number;
    price: number;
    arrivalDate: string;
    departureDate: string;
    destinyAirport: string;
    originAirport: string;
    createdAt: Date;
};
