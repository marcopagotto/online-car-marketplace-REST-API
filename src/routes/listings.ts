import express from 'express';

import { newListing } from '../controllers/listings.js';

export default (router: express.Router) => {
  router.post('/listings', newListing);
};
