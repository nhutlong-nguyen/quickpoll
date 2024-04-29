import { User } from '../../types/DBTypes';
import UserModel from '../models/userModel';
import { GraphQLError } from 'graphql';

export default {
  Query: {
    users: async (): Promise<User[]> => {
      return await UserModel.find();
    },
    user: async (_parent: undefined, args: { id: string }): Promise<User> => {
      const user = await UserModel.findById(args.id);
      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      }
      return user;
    },
  },
  Mutation: {
    addUser: async (
      _parent: undefined,
      args: { user: Omit<User, '_id'> },
    ): Promise<{ message: string; user?: User }> => {
      const user = await UserModel.create(args.user);
      if (user) {
        return { message: 'User added', user };
      } else {
        return { message: 'User not added' };
      }
    },
    modifyUser: async (
      _parent: undefined,
      args: { user: Omit<User, '_id'>; id: string },
    ): Promise<{ message: string; user?: User }> => {
      const user = await UserModel.findByIdAndUpdate(args.id, args.user, {
        new: true,
      });
      if (user) {
        return { message: 'User updated', user };
      } else {
        return { message: 'User not updated' };
      }
    },
    deleteUser: async (
      _parent: undefined,
      args: { id: string },
    ): Promise<{ message: string; user?: User }> => {
      const user = await UserModel.findByIdAndDelete(args.id);
      if (user) {
        return { message: 'User deleted', user };
      } else {
        return { message: 'User not deleted' };
      }
    },
  },
};
