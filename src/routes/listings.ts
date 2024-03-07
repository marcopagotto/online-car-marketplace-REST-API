import express from 'express';

import { newListing, findListings } from '../controllers/listings.js';
import { isAuthenticated, isCarOwner } from '../middlewares/middlewares.js';
import { getListings } from '../db/listings.js';

export default (router: express.Router) => {
  router.post('/listings', isAuthenticated, isCarOwner, newListing);
  router.get('/listings', findListings);
};
