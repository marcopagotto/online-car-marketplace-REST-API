import { getUserBySessionToken } from '../db/users.js';
import _ from 'lodash';
export const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.cookies['AUTH-LOGIN'];
        if (!sessionToken) {
            return res.sendStatus(403);
        }
        const user = await getUserBySessionToken(sessionToken);
        if (!user) {
            console.log(user);
            return res.sendStatus(403);
        }
        _.merge(req, { identity: user });
        next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
export const isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.sendStatus(400);
        }
        const currentId = req.identity[0]._id.toString();
        if (!currentId) {
            return res.sendStatus(400);
        }
        if (currentId !== id) {
            return res.sendStatus(400);
        }
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
