import express from 'express';
import { users, deleteUser } from '../controllers/users.js';
import { isAuthenticated, isOwner } from '../middlewares/middlewares.js';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, users);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
};
