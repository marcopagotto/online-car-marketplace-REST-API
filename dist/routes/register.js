import { registerUser } from '../controllers/authentication.js';
export default (router) => {
    router.post('/auth/register', registerUser);
};
