import express from 'express';
import register from './authentication.js';
import users from './users.js';
import listings from './listings.js';
const router = express.Router();
export default () => {
    register(router);
    users(router);
    listings(router);
    return router;
};
