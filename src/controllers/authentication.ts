import express from 'express';
import { random, authentication } from '../library/library.ts';
import { createUser, getUserByEmail } from '../db/users.ts';

const registerUser = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();

    const newUser = createUser({
      username,
      email,
      authentication: {
        password: authentication(salt, password),
        salt,
      },
    });

    return res.status(201).json(newUser).end()
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
