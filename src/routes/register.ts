import express from 'express';
import { registerUser } from '../controllers/authentication.js';

export default (router: express.Router) => {
  router.post('/auth/register', registerUser);
};
