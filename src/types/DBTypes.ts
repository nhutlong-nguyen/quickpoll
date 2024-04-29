import { ObjectId } from 'mongoose';

type User = {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  roles: string[];
};

type UserWithoutPassword = Omit<User, 'password'>;

export {User, UserWithoutPassword}