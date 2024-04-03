import { authRouter } from './auth/auth.router';
import { Logger } from 'pino';
import { Config } from '../../../infrastructure/config';
import { IUserRepository } from '../../../ports/user-repository';
import { csvRouter } from './csv/csv.router';
import { ICsvDataRepository } from '../../../ports/csv-data-repository';

type RouterParameters = {
  logger: Logger;
  config: Config;
  userRepository: IUserRepository;
  csvDataRepository: ICsvDataRepository;
};

export const expressRouters = async ({ config, logger, userRepository, csvDataRepository }: RouterParameters) => {
  const auth = await authRouter({
    config,
    logger,
    userRepository,
  });

  const csv = await csvRouter({
    logger,
    csvDataRepository,
  });

  return {
    auth,
    csv,
  };
};
