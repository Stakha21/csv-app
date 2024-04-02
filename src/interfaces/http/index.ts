import express, { Express } from 'express';
import { expressRouters } from './routers';
import { Config } from '../../infrastructure/config';
import { Logger } from 'pino';
import { IUserRepository } from '../../ports/user-repository';
import bodyParser from 'body-parser';
import { expressjwt } from 'express-jwt';
import fileUpload from 'express-fileupload';
import { ICsvDataRepository } from '../../ports/csv-data-repository';

type CreateHttpParameters = {
  config: Config;
  logger: Logger;
  userRepository: IUserRepository;
  csvDataRepository: ICsvDataRepository;
};

export const createHttpInterface = async ({
  config,
  logger,
  userRepository,
  csvDataRepository,
}: CreateHttpParameters): Promise<Express> => {
  const app = express();

  app.use(bodyParser.json());
  app.use(fileUpload({}));

  app.use(
    expressjwt({
      secret: config.auth.jwtSecret,
      algorithms: ['HS256'],
    }).unless({ path: ['/api/auth/sign-in', '/api/auth/sign-up'] }),
  );

  const { auth, csv } = await expressRouters({
    config,
    logger,
    userRepository,
    csvDataRepository,
  });

  app.use(`${config.express.prefix}/auth`, auth);
  app.use(`${config.express.prefix}/cvs`, csv);

  return app;
};
