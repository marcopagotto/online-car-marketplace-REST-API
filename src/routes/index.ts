import express from 'express';

import register from './register.js';

const router = express.Router();

export default (): express.Router => {
  register(router);
  return router;
};
