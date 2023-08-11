import express from 'express';
import cors from 'cors';
import { connect } from './setup/mongodb/connect-database.js';
import { logInfo, logSuccess } from './utils/log/index.js';
import { router } from './routes/index.js';
import { routeLogger } from './utils/route-logger/index.js';

const app = express();
const port = process.env.PORT;

logInfo('Setting up middlewares...');
app.use(cors());
app.use(express.json());
app.use(routeLogger);
logSuccess('Middlewares successfully configured!');

logInfo('Setting up routes...');
app.use(router);
logSuccess('Routes successfully configured!');

(async function () {
    logInfo('Connecting to MongoDB database...');
    await connect();
    logSuccess('Successfully connected to MongoDB database!');

    logInfo(`Opening server on port ${port}...`);
    app.listen(port, () => {
        logSuccess(`Azul flight crawler listening on port ${port}!`);
    });
})();
