import { newListing, findListings, deleteListing, getListingById, editListingById, } from '../controllers/listings.js';
import { isAuthenticated, isCarOwner, isListingOwner, } from '../middlewares/middlewares.js';
export default (router) => {
    router.post('/listings/create', isAuthenticated, isCarOwner, newListing);
    router.get('/listings', findListings);
    router.delete('/listings/delete/:id', isAuthenticated, isListingOwner, deleteListing);
    router.patch('/listings/update/:id', isAuthenticated, isListingOwner, editListingById);
    router.get('/listings/:id', isAuthenticated, getListingById);
};
