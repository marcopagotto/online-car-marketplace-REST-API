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

export const getUserById = (id: string) => User.findById(id);

export const getUserByEmail = (email: string) => User.findOne({ email: email });

export const getUserBySessionToken = (sessionToken: string) =>
  User.findOne({ 'authentication.sessionToken': sessionToken });

export const createUser = (values: Record<string, any>) =>
  new User(values).save().then((user) => user.toObject());

export const updateUserById = (id: string, values: Record<string, any>) =>
  User.findByIdAndUpdate({ _id: id }, values);

export const deleteUserById = (id: string) =>
  User.findOneAndDelete({ _id: id });
