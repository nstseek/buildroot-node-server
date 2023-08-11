import { client } from '../../setup/mongodb/connect-database.js';

export const getDb = () => client.db('azul-flight-results');
