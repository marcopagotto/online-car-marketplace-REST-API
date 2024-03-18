import express from 'express';
import {
  getUsers,
  deleteUserById,
  getUserById,
  getCarOwnerByCarId,
} from '../db/users.js';

import { RequestWithIdentity } from '../interfaces/request-with-identity.js';

export const users = async (req: express.Request, res: express.Response) => {
  try {
    const { results } = req.query;

    if (!results) {
      const users = await getUsers();
      return res.status(200).json(users).end();
    }

    const docAmount = parseInt(results as string);

    console.log(docAmount);

    if (isNaN(docAmount) || docAmount < 1) {
      console.log('is NaN');
      return res.sendStatus(400);
    } else {
      console.log('aint NaN');
      const users = await getUsers(docAmount);
      return res.status(200).json(users).end();
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    await deleteUserById(id);
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const addCar = async (req: express.Request, res: express.Response) => {
  try {
    const { make, model, year } = req.body as {
      make: string;
      model: string;
      year: number;
    };

    if (!make || !model || !year) {
      return res.sendStatus(400);
    }

    const car = { make: make, model: model, year: year };

    const id = (req as RequestWithIdentity).identity[0]._id.toString();

    if (!id) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user?.cars.push(car);

    await user?.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getOwner = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }
    console.log(id);
    const owner = await getCarOwnerByCarId(id);
    console.log(owner);
    return res.status(200).json(owner).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
