import { users } from '../controllers/users.js';
import { isAuthenticated } from '../middlewares/middlewares.js';
export default (router) => {
    router.get('/users', isAuthenticated, users);
};
