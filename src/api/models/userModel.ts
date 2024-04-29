import mongoose from 'mongoose';
import { User } from '../../types/DBTypes';

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    minlength: [3, 'Username must be at least 3 characters'],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: [4, 'Password must be at least 4 characters'],
  },
  roles: [
    {
      type: String,
      required: true,
    },
  ], 
});

export default  mongoose.model<User>('User', userSchema);;
