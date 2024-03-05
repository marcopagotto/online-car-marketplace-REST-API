import express from 'express';
import mongoose from 'mongoose';

import { createListing } from '../db/listings.js';
import { CarSchema } from '../db/users.js';

export const newListing = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { car, owner, price } = req.body as {
      car: typeof CarSchema;
      owner: mongoose.Schema.Types.ObjectId;
      price: number;
    };

    if (!car || !owner || !price) {
      return res.sendStatus(400);
    }

    const listing = await createListing(car, owner, price);

    return res.status(200).json(listing).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
