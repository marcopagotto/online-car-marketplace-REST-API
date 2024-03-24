import express from 'express';
import {
  users,
  deleteUser,
  addCar,
  getOwner,
  deleteCar,
} from '../controllers/users.js';
import {
  isAuthenticated,
  isCarOwner,
  isOwner,
} from '../middlewares/middlewares.js';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, users);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  router.post('/cars/:id', isAuthenticated, isOwner, addCar);
  router.get('/cars/owner/:id', isAuthenticated, getOwner);
  router.delete('/cars/:id', isAuthenticated, isCarOwner, deleteCar);
};
