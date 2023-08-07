export type DateObject = {
    day: number;
    month: number;
    year: number;
};

export type DateStringObject = Record<keyof DateObject, string>;

export const convertNumberToDateNumber = (num: number) =>
    num.toString().padStart(2, '0');

export const convertDateObjectToDateStringObject = (
    dateObject: DateObject,
): DateStringObject => ({
    month: convertNumberToDateNumber(dateObject.month),
    day: convertNumberToDateNumber(dateObject.day),
    year: convertNumberToDateNumber(dateObject.year),
});

export const buildDateStringFromDateObject = (dateObject: DateObject) => {
    const dateStringObject = convertDateObjectToDateStringObject(dateObject);

    return buildDateString(dateStringObject);
};

export const buildDateString = (dateStringObject: DateStringObject) =>
    [dateStringObject.month, dateStringObject.day, dateStringObject.year].join(
        '/',
    );
