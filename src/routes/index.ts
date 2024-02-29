import express from 'express';

import register from './authentication.js';
import users from './users.js';

const router = express.Router();

export default (): express.Router => {
  register(router);
  users(router);
  return router;
};
