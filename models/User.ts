import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema, 'Users');

export default User;