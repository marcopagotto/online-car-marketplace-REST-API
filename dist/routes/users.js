import { users, deleteUser, addCar } from '../controllers/users.js';
import { isAuthenticated, isOwner } from '../middlewares/middlewares.js';
export default (router) => {
    router.get('/users', isAuthenticated, users);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.post('/cars/:id', isAuthenticated, isOwner, addCar);
};
