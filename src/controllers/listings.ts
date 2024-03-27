import express from 'express';
import mongoose from 'mongoose';

import {
  createListing,
  deleteListingById,
  getListingById as findListingById,
} from '../db/listings.js';
import { getUserById, getCarOwnerByCarId } from '../db/users.js';
import { getListings } from '../db/listings.js';
import {
  Car,
  RequestWithIdentity,
} from '../interfaces/request-with-identity.js';

export const newListing = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { carId, owner, price } = req.body as {
      carId: mongoose.Schema.Types.ObjectId;
      owner: mongoose.Schema.Types.ObjectId;
      price: number;
    };

    if (!carId || !owner || !price) {
      return res.sendStatus(400);
    }

    const user = await getUserById(owner.toString());

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedUser = await getCarOwnerByCarId(carId.toString());

    if (JSON.stringify(user) !== JSON.stringify(expectedUser)) {
      return res.sendStatus(401);
    }

    const car = user.cars.find(
      (car) => car?._id?.toString() === carId.toString()
    );

    if (!car) {
      return res.sendStatus(400);
    }

    const listing = await createListing(car, owner, price);

    console.log(listing);

    return res.status(200).json(listing).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const findListings = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const listings = await getListings();

    return res.status(200).json(listings).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteListing = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    const listing = await findListingById(id);

    if (!listing) {
      return res.sendStatus(400);
    }

    await deleteListingById(id);

    return res.status(200).json(listing).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getListingById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    const listing = await findListingById(id);

    if (!listing) {
      return res.sendStatus(400);
    }

    return res.status(200).json(listing).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const editListingById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id: listingId } = req.params;

    if (!listingId) {
      return res.sendStatus(400);
    }

    const { carId, price } = req.body as {
      carId: string;
      price: number;
    };

    if (!carId && !price) {
      return res.sendStatus(400);
    }

    const currentId = (req as RequestWithIdentity).identity[0]._id.toString();

    if (!currentId) {
      return res.sendStatus(400);
    }

    if (carId) {
      const carOwner = await getCarOwnerByCarId(carId);

      if (!carOwner) {
        return res.sendStatus(400);
      }
      console.log(currentId);
      console.log(carOwner);
      if (currentId !== carOwner._id.toString()) {
        return res.sendStatus(400);
      }
    }

    const car: Car = (req as RequestWithIdentity).identity[0].cars.find(
      (car: Car) => car._id.toString() === carId
    );

    if (!car) {
      return res.sendStatus(400);
    }

    const listing = await findListingById(listingId);

    if (!listing) {
      return res.sendStatus(400);
    }

    listing.price = price || listing.price;
    listing.car = car || listing.car;

    await listing.save();

    return res.status(200).json(listing).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
