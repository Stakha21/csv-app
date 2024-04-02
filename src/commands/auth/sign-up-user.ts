import { Logger } from 'pino';

import { Config } from '../../infrastructure/config';
import { IUserRepository } from '../../ports/user-repository';
import { User } from '../../domain/user';
import { Command } from '../../helpers/types/command';
import { createUser } from '../../aplication-service/user/create-user';

type GetSignUpUserCommandParameters = {
  logger: Logger;
  config: Config;
  userRepository: IUserRepository;
};

type Parameters = {
  email: string;
  password: string;
};

type Output = User | Error;

export const getSignUpUserCommand = (
  commandParameters: GetSignUpUserCommandParameters,
): Command<Parameters, Promise<Output>> => {
  return async (parameters: Parameters): Promise<Output> => {
    return createUser({ ...parameters, ...commandParameters });
  };
};
