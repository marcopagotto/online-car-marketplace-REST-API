import mongoose from 'mongoose';
export const CarSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
});
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    cars: [CarSchema],
});
export const User = mongoose.model('User', UserSchema);
export const getUsers = () => User.find();
export const getUserById = (id) => User.findById(id);
export const getUserByEmail = (email) => User.findOne({ email: email });
export const getUserBySessionToken = (sessionToken) => User.find({ 'authentication.sessionToken': sessionToken });
export const createUser = (values) => new User(values).save().then((user) => user.toObject());
export const updateUserById = (id, values) => User.findByIdAndUpdate({ _id: id }, values);
export const deleteUserById = (id) => User.findOneAndDelete({ _id: id });
export const getCarOwnerByCarId = (id) => User.findOne({ 'cars._id': id });
