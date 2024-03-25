import { newListing, findListings, deleteListing, getListingById, } from '../controllers/listings.js';
import { isAuthenticated, isCarOwner, isListingOwner, } from '../middlewares/middlewares.js';
export default (router) => {
    router.post('/listings', isAuthenticated, isCarOwner, newListing);
    router.get('/listings', findListings);
    router.delete('/listings/:id', isAuthenticated, isListingOwner, deleteListing);
    router.get('/listings/:id', isAuthenticated, getListingById);
};
