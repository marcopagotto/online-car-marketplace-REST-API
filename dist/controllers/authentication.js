import { getUserByEmail } from '../db/users.ts';
const registerUser = (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.sendStatus(400);
        }
        else if (getUserByEmail(email)) {
        }
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
