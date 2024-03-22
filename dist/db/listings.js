import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { CarSchema } from './users.js';
const ListingSchema = new mongoose.Schema({
    car: { type: CarSchema, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
});
const Listing = mongoose.model('Listing', ListingSchema);
export const getListings = () => Listing.find();
export const createListing = (car, owner, price) => {
    const listing = {
        car,
        owner,
        price,
    };
    return new Listing(listing).save().then((list) => list.toObject());
};
export const deleteListingsByUserId = (id) => Listing.deleteMany({ owner: new ObjectId(id) });
