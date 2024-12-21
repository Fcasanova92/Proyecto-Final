import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    required: true,
    default: false,
  },
  verifyCode: {
    type: String,
    required: true,
    default: '',
  },
  verify: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const userModel = mongoose.model(userCollection, userSchema);
