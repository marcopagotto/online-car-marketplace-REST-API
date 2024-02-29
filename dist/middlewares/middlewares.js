import { getUserBySessionToken } from '../db/users.js';
import { merge } from 'lodash';
export const isAuthenticated = async (req, res, next) => {
    const sessionToken = req.cookies['AUTH-LOGIN'];
    if (!sessionToken) {
        return res.sendStatus(403);
    }
    const user = await getUserBySessionToken(sessionToken);
    if (!user) {
        return res.sendStatus(403);
    }
    merge(req, { identity: user });
    next();
};
