import express from 'express';
import { registerUser, loginUser, editUserPassword } from '../controllers/authentication.js';
import { isAuthenticated } from '../middlewares/middlewares.js';

export default (router: express.Router) => {
  router.post('/auth/register', registerUser);
  router.post('/auth/login', loginUser);
  router.patch('/auth/change-password', isAuthenticated, editUserPassword);
};
