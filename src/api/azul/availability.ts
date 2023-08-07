import { AvailabilityResponse, Journey } from './availability.types.js';

type JourneyPrice = {
    price: number;
    points: number;
    flightNumber: string;
    departureDate: string;
    arrivalDate: string;
    originAirport: string;
    destinyAirport: string;
    duration: Journey['identifier']['duration'];
};

export const availabilityRoute =
    'https://b2c-api.voeazul.com.br/tudoAzulReservationAvailability/api/tudoazul/reservation/availability/v4/availability';

export const findJourneyPrice = (journey: Journey): JourneyPrice => {
    const { money, points } = journey.fares[0].paxPoints[1].levels[0];

    const {
        flightNumber,
        sta,
        std,
        arrivalStation,
        departureStation,
        duration,
    } = journey.identifier;

    return {
        flightNumber,
        duration,
        points,
        price: money,
        arrivalDate: sta,
        departureDate: std,
        destinyAirport: arrivalStation,
        originAirport: departureStation,
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

export const getCheapestJourneyPrice = (journeys: Journey[]) => {
    const journeyPrices = getJourneyPrices(journeys);

    const cheapestJourneyPrice = findCheapestJourney(journeyPrices);

    return cheapestJourneyPrice;
};

export const getCheapestJourney = (journeys: Journey[]) => {
    const cheapestJourneyPrice = getCheapestJourneyPrice(journeys);

    const cheapestJourney = findJourneyByFlightNumber({
        flightNumber: cheapestJourneyPrice.flightNumber,
        journeys,
    });

    return cheapestJourney;
};

export const getCheapestRoundTripJourneyPrices = (
    availabilityJson: AvailabilityResponse,
) => {
    const [firstTrip, secondTrip] = availabilityJson.data.trips;

    return {
        ida: getCheapestJourneyPrice(firstTrip.journeys),
        volta: getCheapestJourneyPrice(secondTrip.journeys),
    };
};
