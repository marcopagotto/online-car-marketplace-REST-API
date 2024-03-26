import express from 'express';
import { getUserBySessionToken, getCarOwnerByCarId } from '../db/users.js';
import { RequestWithIdentity } from '../interfaces/request-with-identity.js';
import _ from 'lodash';
import apicache from 'apicache';
import { getListingById } from '../db/listings.js';

export const isAuthenticated: express.RequestHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies['AUTH-LOGIN'];

    if (!sessionToken) {
      apicache.clear(req.url);
      return res.sendStatus(403);
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      apicache.clear(req.url);
      return res.sendStatus(403);
    }

    _.merge(req, { identity: user });

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    const currentId = (req as RequestWithIdentity).identity[0]._id.toString();

    if (!currentId) {
      return res.sendStatus(400);
    }

    if (currentId !== id) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isCarOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const currentId = (req as RequestWithIdentity).identity[0]._id.toString();

    if (!currentId) {
      return res.sendStatus(400);
    }

    if (req.method === 'POST') {
      const owner = req.body.owner;

      if (!owner) {
        return res.sendStatus(400);
      }

      if (currentId !== owner) {
        return res.sendStatus(401);
      }
    }

    if (req.method === 'DELETE' || 'PATCH') {
      const { id } = req.params;

      if (!id) {
        return res.sendStatus(400);
      }

      const owner = await getCarOwnerByCarId(id);

      if (!owner) {
        return res.sendStatus(400);
      }

      if (currentId !== owner._id.toString()) {
        return res.sendStatus(401);
      }
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isListingOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    const listing = await getListingById(id);

    if (!listing) {
      return res.sendStatus(400);
    }

    const owner = listing.owner.toString();

    if (!owner) {
      return res.sendStatus(400);
    }

    const currentId = (req as RequestWithIdentity).identity[0]._id.toString();

    if (!currentId) {
      return res.sendStatus(400);
    }

    if (currentId !== owner) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
