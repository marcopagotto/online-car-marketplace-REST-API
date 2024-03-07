import { newListing, findListings } from '../controllers/listings.js';
import { isAuthenticated, isCarOwner } from '../middlewares/middlewares.js';
export default (router) => {
    router.post('/listings', isAuthenticated, isCarOwner, newListing);
    router.get('/listings', findListings);
};
