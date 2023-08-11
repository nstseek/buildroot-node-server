import { NextFunction, Request, Response } from 'express';
import { logError, logInfo, logSuccess, logWarning } from '../log/index.js';

export const routeLogger = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    res.on('finish', () => {
        const logMessage = `${req.method} ${req.originalUrl} - ${res.statusCode}`;

        if (res.statusCode >= 500) {
            logError(logMessage);
        } else if (res.statusCode >= 400) {
            logWarning(logMessage);
        } else if (res.statusCode >= 300) {
            logInfo(logMessage);
        } else if (res.statusCode >= 200) {
            logSuccess(logMessage);
        } else {
            logInfo(logMessage);
        }
    });

    next();
};
