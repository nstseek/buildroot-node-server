import {
    DateObject,
    buildDateStringFromDateObject,
} from '../date/date-object.js';

// selecao-voo URL example: 'https://www.voeazul.com.br/br/pt/home/selecao-voo?c[0].ds=POA&c[0].std=08/15/2023&c[0].as=SAO&c[1].ds=SAO&c[1].std=08/16/2023&c[1].as=POA&p[0].t=ADT&p[0].c=1&p[0].cp=false&f.dl=3&f.dr=3&cc=PTS',

// looks like the order in this object is important
// do not change the order
const CONST_QUERY_PARAMS = {
    'p[0].t': 'ADT',
    'p[0].c': '1',
    'p[0].cp': 'false',
    'f.dl': '3',
    'f.dr': '3',
    cc: 'PTS',
};

enum QueryParamKeys {
    OriginAirport0 = 'c[0].ds',
    DepartureDate0 = 'c[0].std',
    DestinyAirport0 = 'c[0].as',
    DestinyAirport1 = 'c[1].ds',
    ReturnDate1 = 'c[1].std',
    OriginAirport1 = 'c[1].as',
}

type QueryParams = Record<QueryParamKeys, string>;

type FinalQueryParams = QueryParams & typeof CONST_QUERY_PARAMS;

const makeQueryParams = ({
    originAirport,
    destinyAirport,
    departureDate,
    returnDate,
}: {
    originAirport: string;
    destinyAirport: string;
    departureDate: DateObject;
    returnDate: DateObject;
}): FinalQueryParams => {
    // looks like the order in this object is also important
    // do not change it
    return {
        [QueryParamKeys.OriginAirport0]: originAirport,
        [QueryParamKeys.DepartureDate0]:
            buildDateStringFromDateObject(departureDate),
        [QueryParamKeys.DestinyAirport0]: destinyAirport,
        [QueryParamKeys.DestinyAirport1]: destinyAirport,
        [QueryParamKeys.ReturnDate1]: buildDateStringFromDateObject(returnDate),
        [QueryParamKeys.OriginAirport1]: originAirport,
        ...CONST_QUERY_PARAMS,
    };
};

export const makeSelecaoVooUrl = (params: {
    originAirport: string;
    destinyAirport: string;
    departureDate: DateObject;
    returnDate: DateObject;
}) => {
    const baseUrl = 'https://www.voeazul.com.br/br/pt/home/selecao-voo';

    const queryParamsObject: FinalQueryParams = makeQueryParams(params);

    const queryParams = new URLSearchParams(queryParamsObject);

    return `${baseUrl}?${decodeURIComponent(queryParams.toString())}`;
};
