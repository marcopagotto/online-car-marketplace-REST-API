import dotenv from 'dotenv';
dotenv.config();
const MONGO_ADMIN = process.env.MONGO_ADMIN || '';
const MONGO_ADMIN_PASSWORD = process.env.MONGO_ADMIN_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_ADMIN}:${MONGO_ADMIN_PASSWORD}@cluster0.w4mh190.mongodb.net/`;
const SERVER_PORT = process.env.SERVER_PORT || '8080';
const HASHING_ALGORITHM = process.env.HASHING_ALOGRITHM || 'sha256';
const SECRET_KEY = process.env.SECRET_KEY || '';
export default {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
    crypto: {
        hashingAlgorithm: HASHING_ALGORITHM,
        secretKey: SECRET_KEY,
    },
};
