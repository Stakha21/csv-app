import { User } from '../../../domain/user';
import { UserDocument } from '../schema/user.schema';

export const toDomainUser = (mongoUser: UserDocument): User => {
  return {
    id: mongoUser._id,
    email: mongoUser.email,
    salt: mongoUser.salt,
    hash: mongoUser.hash,
    createdAt: mongoUser.createdAt,
    updatedAt: mongoUser.updatedAt,
  };
};
