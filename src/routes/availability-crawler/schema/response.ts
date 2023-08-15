import { Flight } from '../../../database/flight/schema/index.js';

export type AvailabilityCrawlerResponse = {
    message: string;
    data: Flight[] | null;
    nextUrl: string | null;
};

export const makeResponse = ({
    message,
    data = null,
    nextUrl = null,
}: Pick<AvailabilityCrawlerResponse, 'message'> &
    Partial<Pick<AvailabilityCrawlerResponse, 'data' | 'nextUrl'>>) => ({
    message,
    data,
    nextUrl,
});
