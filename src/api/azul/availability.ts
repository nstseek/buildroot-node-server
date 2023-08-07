import { Journey } from './availability.types.js';

type JourneyPrice = {
    price: number;
    points: number;
    flightNumber: string;
    departureDate: string;
    arrivalDate: string;
    originAirport: string;
    destinyAirport: string;
};

export const availabilityRoute =
    'https://b2c-api.voeazul.com.br/tudoAzulReservationAvailability/api/tudoazul/reservation/availability/v4/availability';

export const findJourneyPrice = (journey: Journey): JourneyPrice => {
    const level = journey.fares[0].paxPoints[1].levels[0];

    return {
        price: level.money,
        points: level.points,
        flightNumber: journey.identifier.flightNumber,
        arrivalDate: journey.identifier.sta,
        departureDate: journey.identifier.std,
        destinyAirport: journey.identifier.arrivalStation,
        originAirport: journey.identifier.departureStation,
    };
};

export const getJourneyPrices = (journeys: Journey[]) =>
    journeys.map((journey) => findJourneyPrice(journey));

export const findCheapestJourney = (journeyPrices: JourneyPrice[]) => {
    let cheapestJourney = journeyPrices[0];

    journeyPrices.forEach((journeyPrice) => {
        if (journeyPrice.price < cheapestJourney.price) {
            cheapestJourney = journeyPrice;
        }
    });

    return cheapestJourney;
};

export const findJourneyByFlightNumber = ({
    flightNumber,
    journeys,
}: {
    flightNumber: string;
    journeys: Journey[];
}) =>
    journeys.find(
        (journey) => journey.identifier.flightNumber === flightNumber,
    );

export const getCheapestJourney = (journeys: Journey[]) => {
    const journeyPrices = getJourneyPrices(journeys);

    const cheapestJourneyPrice = findCheapestJourney(journeyPrices);

    const cheapestJourney = findJourneyByFlightNumber({
        flightNumber: cheapestJourneyPrice.flightNumber,
        journeys,
    });

    return cheapestJourney;
};
