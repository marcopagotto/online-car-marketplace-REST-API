import { users, deleteUser } from '../controllers/users.js';
import { isAuthenticated, isOwner } from '../middlewares/middlewares.js';
export default (router) => {
    router.get('/users', isAuthenticated, users);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
};
