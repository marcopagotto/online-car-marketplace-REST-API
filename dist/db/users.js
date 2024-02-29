import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, require: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});
export const User = mongoose.model('User', UserSchema);
export const getUsers = () => User.find();
export const getUserById = (id) => User.findById(id);
export const getUserByEmail = (email) => User.findOne({ email: email });
export const getUserBySessionToken = (sessionToken) => User.findOne({ 'authentication.sessionToken': sessionToken });
export const createUser = (values) => new User(values).save().then((user) => user.toObject());
export const updateUserById = (id, values) => User.findByIdAndUpdate({ _id: id }, values);
export const deleteUserById = (id) => User.findOneAndDelete({ _id: id });
