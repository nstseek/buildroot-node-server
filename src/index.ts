import express from 'express';
import cors from 'cors';
import { logInfo, logSuccess } from './utils/log/index.js';
import { routeLogger } from './utils/route-logger/index.js';
import { errorMiddleware } from './utils/error-middleware/error-middleware.js';

const app = express();
const port = process.env.PORT || 3000;

logInfo('Setting up middlewares...');
app.use(cors());
app.use(express.json());
app.use(routeLogger);
logSuccess('Middlewares successfully configured!');

logInfo('Setting up routes...');
app.get('/', (_, res) => {
    res.send('Hello world! Right now is ' + new Date().toLocaleString());
});
logSuccess('Routes successfully configured!');

logInfo('Setting up error handler...');
app.use(errorMiddleware);
logSuccess('Error handler successfully configured!');

logInfo(`Opening server on port ${port}...`);
app.listen(port, () => {
    logSuccess(`Buildroot node server listening on port ${port}!`);
});
