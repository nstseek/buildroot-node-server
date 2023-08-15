import { NextFunction, Request, Response } from 'express';
import { logError } from '../log/index.js';

export const errorMiddleware = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    logError(err);
    res.status(500).send('Something went wrong!');
};
