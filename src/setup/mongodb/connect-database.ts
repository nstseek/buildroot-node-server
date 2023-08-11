import { MongoClient, ServerApiVersion } from 'mongodb';
import { makeUri } from '../../utils/mongodb/make-uri.js';
import { logError } from '../../utils/log/index.js';

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const host = process.env.MONGODB_HOST;

if (!username) {
    logError(
        'MongoDB username not provided in environment variables/.env file!',
    );
    throw new Error(
        'MongoDB username not provided in environment variables/.env file!',
    );
}

if (!password) {
    logError(
        'MongoDB password not provided in environment variables/.env file!',
    );
    throw new Error(
        'MongoDB password not provided in environment variables/.env file!',
    );
}

if (!host) {
    logError('MongoDB host not provided in environment variables/.env file!');
    throw new Error(
        'MongoDB host not provided in environment variables/.env file!',
    );
}

const uri = makeUri({ username, password, host });

export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export async function connect() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db('admin').command({ ping: 1 });
    } catch (err) {
        logError('MongoDB database connection failed!');
        throw err;
    }
}
