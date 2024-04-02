import { Logger } from 'pino';

import { Config } from '../../infrastructure/config';
import { IUserRepository } from '../../ports/user-repository';
import { User } from '../../domain/user';
import { Command } from '../../helpers/types/command';
import { signInUser } from '../../aplication-service/auth/sign-in-user';

type GetSignInUserCommandParameters = {
  logger: Logger;
  config: Config;
  userRepository: IUserRepository;
};

type Parameters = {
  email: string;
  password: string;
};

type Output = User | Error;

export const getSignInUserCommand = (
  commandParameters: GetSignInUserCommandParameters,
): Command<Parameters, Promise<Output>> => {
  return async (parameters: Parameters): Promise<Output> => {
    return signInUser({ ...parameters, ...commandParameters });
  };
};
