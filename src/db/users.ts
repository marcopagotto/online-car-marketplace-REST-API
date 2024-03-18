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

export const getUsers = (docAmount = 5) => {
  return User.find().limit(docAmount);
};

export const getUserById = (id: string) => User.findById(id);

export const getUserByEmail = (email: string) => User.findOne({ email: email });

export const getUserBySessionToken = (sessionToken: string) =>
  User.find({ 'authentication.sessionToken': sessionToken });

export const createUser = (values: Record<string, any>) =>
  new User(values).save().then((user) => user.toObject());

export const updateUserById = (id: string, values: Record<string, any>) =>
  User.findByIdAndUpdate({ _id: id }, values);

export const deleteUserById = (id: string) =>
  User.findOneAndDelete({ _id: id });

export const getCarOwnerByCarId = (id: string) =>
  User.findOne({ 'cars._id': id });
