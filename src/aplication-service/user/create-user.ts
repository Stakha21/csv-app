import { Config } from '../../infrastructure/config';
import { Logger } from 'pino';
import { User } from '../../domain/user';
import { IUserRepository } from '../../ports/user-repository';
import { ErrorType } from '../../helpers/types/error-types';
import { createPasswordHash } from '../../helpers/functions/create-password-hash';

type CreateUserParameters = {
  config: Config;
  logger: Logger;
  email: string;
  password: string;
  userRepository: IUserRepository;
};

export const createUser = async ({
  config,
  logger,
  email,
  password,
  userRepository,
}: CreateUserParameters): Promise<User | Error> => {
  const user = await userRepository.getByEmail(email);

  if (user instanceof Error) {
    logger.error({ email }, 'Something went wrong while getting user 🚨');

    return new Error(ErrorType.INVALID_ARGUMENTS);
  }

  if (user) {
    logger.error({ email }, 'User with this email exists 🚨');

    return new Error(ErrorType.INVALID_ARGUMENTS);
  }

  const { salt, passwordHash: hash } = await createPasswordHash({ config, logger, password });

  return userRepository.create({
    email,
    salt,
    hash,
  });
};
