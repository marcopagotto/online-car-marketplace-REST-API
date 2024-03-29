import express from 'express';
import { random, authentication } from '../library/library.js';
import { createUser, getUserByEmail } from '../db/users.js';
import { RequestWithIdentity } from '../interfaces/request-with-identity.js';

export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(403);
    }

    const salt = random();

    const newUser = await createUser({
      username,
      email,
      authentication: {
        password: authentication(salt, password),
        salt,
      },
    });

    return res.status(201).json(newUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedPassword = authentication(
      user.authentication?.salt!,
      password
    );

    if (user.authentication?.password !== expectedPassword) {
      return res.sendStatus(403);
    }

    const salt = random();

    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie('AUTH-LOGIN', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const editUserPassword = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(
      (req as RequestWithIdentity).identity[0].email
    ).select('+authentication.salt +authentication.password');

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedPassword = authentication(
      user?.authentication?.salt!,
      oldPassword
    );

    if (expectedPassword !== user?.authentication?.password) {
      return res.sendStatus(400);
    }

    user.authentication.password = authentication(
      user?.authentication?.salt!,
      newPassword
    );

    if (expectedPassword === user.authentication.password) {
      return res.sendStatus(400);
    }

    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
