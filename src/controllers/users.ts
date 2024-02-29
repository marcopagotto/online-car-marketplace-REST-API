import express from 'express';
import { getUsers } from '../db/users.js';

export const users = async (req: express.Request, res: express.Response) => {
  try {
    console.log('runs');
    const users = await getUsers();
    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};
