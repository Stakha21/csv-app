import { User } from '../domain/user';

export type CreateUserParameters = Pick<User, 'email' | 'hash' | 'salt'>;

export interface IUserRepository {
  create(parameters: CreateUserParameters): Promise<User | Error>;

  getByEmail(email: string): Promise<User | Error | null>;
}
