import { getUsers, deleteUserById, getUserById } from '../db/users.js';
export const users = async (req, res) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        await deleteUserById(id);
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
