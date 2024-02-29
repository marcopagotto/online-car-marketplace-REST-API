import { users } from '../controllers/users.js';
export default (router) => {
    router.get('/users', users);
};
