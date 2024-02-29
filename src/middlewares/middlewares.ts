import express from 'express';
import { getUserBySessionToken } from '../db/users.js';
import _ from 'lodash';

export const isAuthenticated: express.RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const sessionToken = req.cookies['AUTH-LOGIN'];
    console.log(sessionToken)
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      return res.sendStatus(403);
    }

    _.merge(req, { identity: user });
    
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
