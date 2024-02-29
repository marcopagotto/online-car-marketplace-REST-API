import express from 'express';
import register from './register.js';
const router = express.Router();
export default () => {
    register(router);
    return router;
};
