import { newListing } from '../controllers/listings.js';
export default (router) => {
    router.post('/listings', newListing);
};
