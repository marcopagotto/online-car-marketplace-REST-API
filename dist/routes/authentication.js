import { registerUser, loginUser } from '../controllers/authentication.js';
export default (router) => {
    router.post('/auth/register', registerUser);
    router.post('/auth/login', loginUser);
};
