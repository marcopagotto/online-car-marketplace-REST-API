import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

import { CarSchema } from './users.js';

const ListingSchema = new mongoose.Schema({
  car: { type: CarSchema, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true },
  price: { type: Number, required: true },
});

const Listing = mongoose.model('Listing', ListingSchema);

export const getListings = (docAmount = 5) => Listing.find().limit(docAmount);

export const createListing = (
  car: mongoose.Types.Subdocument,
  owner: mongoose.Schema.Types.ObjectId,
  price: number
) => {
  const listing = {
    car,
    owner,
    price,
  };
  return new Listing(listing).save().then((list) => list.toObject());
};

export const deleteListingsByUserId = (id: string) =>
  Listing.deleteMany({ owner: new ObjectId(id) });

export const getListingById = (id: string) =>
  Listing.findOne({ _id: new ObjectId(id) });

export const deleteListingById = (id: string) =>
  Listing.deleteOne({ _id: new ObjectId(id) });

export const getListingByCarId = (id: string) =>
  Listing.findOne({ 'car._id': new ObjectId(id) });
