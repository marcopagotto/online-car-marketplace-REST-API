import express from 'express';
import { users } from '../controllers/users.js';
import { isAuthenticated } from '../middlewares/middlewares.js';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, users);
};
