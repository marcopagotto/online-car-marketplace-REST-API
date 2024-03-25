import express from 'express';

import {
  newListing,
  findListings,
  deleteListing,
} from '../controllers/listings.js';
import {
  isAuthenticated,
  isCarOwner,
  isListingOwner,
} from '../middlewares/middlewares.js';

export default (router: express.Router) => {
  router.post('/listings', isAuthenticated, isCarOwner, newListing);
  router.get('/listings', findListings);
  router.delete('/listings/:id', isAuthenticated, isListingOwner, deleteListing);
};
