import { Config } from '../../infrastructure/config';
import { Logger } from 'pino';
import { User } from '../../domain/user';
import { IUserRepository } from '../../ports/user-repository';
import { ErrorType } from '../../helpers/types/error-types';
import { comparePasswords } from '../../helpers/functions/compare-passwords';

type SignInParameters = {
  config: Config;
  logger: Logger;
  email: string;
  password: string;
  userRepository: IUserRepository;
};

export const signInUser = async ({
  config,
  logger,
  email,
  password,
  userRepository,
}: SignInParameters): Promise<User | Error> => {
  const user = await userRepository.getByEmail(email);

  if (user instanceof Error || !user) {
    logger.error({ email }, 'Something went wrong while getting user 🚨');

    return new Error(ErrorType.INVALID_ARGUMENTS);
  }

  const isPasswordValid = await comparePasswords({
    config,
    password,
    originalPasswordHash: user.hash,
    salt: user.salt,
  });

  if (!isPasswordValid) {
    logger.error('Entered password is incorrect! 🚨');

    return new Error(ErrorType.INVALID_ARGUMENTS);
  }

  return user;
};
