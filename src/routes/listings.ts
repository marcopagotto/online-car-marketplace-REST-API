import express from 'express';

import { newListing } from '../controllers/listings.js';
import { isAuthenticated, isCarOwner } from '../middlewares/middlewares.js';

export default (router: express.Router) => {
  router.post('/listings', isAuthenticated, isCarOwner, newListing);
};
