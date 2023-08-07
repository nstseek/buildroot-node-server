export type PaxPoint = {
    amountLevel: number;
    levels: Level[];
};

export type Fare = {
    productClass: {
        code: string;
        category: string;
        name: string;
    };
    classOfService: string;
    key: string;
    fareSellKey: string;
    paxPoints: PaxPoint[];
    paxFares: null;
};

export type Leg = {
    legKey: string;
    identifier: {
        carrierCode: string;
        flightNumber: string;
        opSuffix: null;
        departureStation: string;
        arrivalStation: string;
        std: string;
        sta: string;
        duration: {
            days: number;
            hours: number;
            minutes: number;
        };
    };
};

export type Level = {
    paxType: string;
    money: number;
    originalPoints: number;
    points: number;
    discountPoints: number;
    pointsDiscountApplied: boolean;
    taxesAndFees: number;
    convenienceFee: number;
    totalAmount: number;
    currencyCode: string;
    hold: null;
};

export type Journey = {
    journeyKey: string;
    journeySellKey: string;
    restrictions: null;
    status: { available: boolean; reason: null };
    fares: Fare[];
    identifier: {
        operatedBy: string;
        carrierCode: string;
        flightNumber: string;
        opSuffix: null;
        departureStation: string;
        arrivalStation: string;
        std: string;
        sta: string;
        duration: {
            days: number;
            hours: number;
            minutes: number;
        };
        connections: null;
    };
    segments: [
        {
            equipment: {
                name: string;
                suffix: string;
                type: string;
            };
            segmentKey: string;
            identifier: {
                operatedBy: string;
                carrierCode: string;
                flightNumber: string;
                opSuffix: null;
                departureStation: string;
                arrivalStation: string;
                std: string;
                sta: string;
                stops: null;
            };
            legs: Leg[];
        },
    ];
};

export type Trip = {
    departureStation: string;
    arrivalStation: string;
    std: string;
    currencyCode: string;
    flightType: string;
    region: string;
    fareInformation: {
        lowestPoints: number;
        highestPoints: number;
    };
    journeys: Journey[];
};

export type AvailabilityResponse = {
    data: {
        trips: Trip[];
    };
    notifications: [];
};
