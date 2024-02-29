import { random, authentication } from '../library/library.js';
import { createUser, getUserByEmail } from '../db/users.js';
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.sendStatus(400);
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.sendStatus(400);
        }
        const salt = random();
        const newUser = await createUser({
            username,
            email,
            authentication: {
                password: authentication(salt, password),
                salt,
            },
        });
        return res.status(201).json(newUser).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
