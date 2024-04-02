import { CreateUserParameters, IUserRepository } from '../../../ports/user-repository';
import { Config } from '../../config';
import { Logger } from 'pino';
import mongoose, { Model } from 'mongoose';
import { User } from '../../../domain/user';
import { UserSchema } from '../schema/user.schema';
import { ErrorType } from '../../../helpers/types/error-types';
import { toDomainUser } from '../mapper/user-mapper';

export type UserRepositoryParameters = {
  logger: Logger;
};

export class UserRepository implements IUserRepository {
  private logger: Logger;
  private userModel: Model<User>;

  constructor({ logger }: UserRepositoryParameters) {
    this.logger = logger.child({ name: 'UserRepository' });
    this.userModel = mongoose.model('UserModel', UserSchema);
  }

  async create(parameters: CreateUserParameters): Promise<User | Error> {
    try {
      const mongoUser = await this.userModel.create({
        email: parameters.email,
        salt: parameters.salt,
        hash: parameters.hash,
      });

      return toDomainUser(mongoUser);
    } catch (error) {
      this.logger.error({ parameters, err: error }, 'The user was not created 🚨');

      return new Error(ErrorType.UNEXPECTED_BEHAVIOR);
    }
  }

  async getByEmail(email: string): Promise<User | Error | null> {
    try {
      const mongoUser = await this.userModel.findOne({
        email,
      });

      if (!mongoUser) {
        return null;
      }

      return toDomainUser(mongoUser);
    } catch (error) {
      this.logger.error({ email, err: error }, 'The user was not found 🚨');

      return new Error(ErrorType.UNEXPECTED_BEHAVIOR);
    }
  }
}
