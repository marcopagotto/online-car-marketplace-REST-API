import express from 'express';
import {
  users,
  deleteUser,
  addCar,
  getOwner,
  deleteCar,
  editCar
} from '../controllers/users.js';
import {
  isAuthenticated,
  isCarOwner,
  isOwner,
} from '../middlewares/middlewares.js';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, users);
  router.delete('/users/delete/:id', isAuthenticated, isOwner, deleteUser);
  router.post('/cars/add/:id', isAuthenticated, isOwner, addCar);
  router.get('/cars/owner/:id', isAuthenticated, getOwner);
  router.delete('/cars/delete/:id', isAuthenticated, isCarOwner, deleteCar);
  router.patch('/cars/update/:id', isAuthenticated, isCarOwner, editCar);
};
