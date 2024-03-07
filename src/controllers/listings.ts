import express from 'express';
import mongoose from 'mongoose';

import { createListing } from '../db/listings.js';
import { CarSchema } from '../db/users.js';
import { getUserById, getCarOwnerByCarId } from '../db/users.js';

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
      return res.sendStatus(400);
    }

    const car = user.cars.find((car) => car._id.toString() === carId);

    console.log(car);
    const listing = await createListing(car, owner, price);

    console.log(listing);

    return res.status(200).json(listing).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
