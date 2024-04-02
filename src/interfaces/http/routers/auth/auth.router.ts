import express, { Request, Router } from 'express';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../../../ports/user-repository';
import { Logger } from 'pino';
import { Config } from '../../../../infrastructure/config';
import { getSignUpUserCommand } from '../../../../commands/auth/sign-up-user';
import { getSignInUserCommand } from '../../../../commands/auth/sign-in-user';
import { CreateUserDto } from './dto/create-user.dto';

type AuthRouterParameters = {
  logger: Logger;
  config: Config;
  userRepository: IUserRepository;
};

export const authRouter = async ({ config, logger, userRepository }: AuthRouterParameters): Promise<Router> => {
  const auth = express.Router();

  auth.post('/sign-up', async (req: Request<NonNullable<unknown>, NonNullable<unknown>, CreateUserDto>, res) => {
    const { email, password } = req.body;

    const createUser = getSignUpUserCommand({
      logger,
      config,
      userRepository,
    });

    const user = await createUser({
      email,
      password,
    });

    if (user instanceof Error) {
      return res.status(500).send('User was not created!');
    }

    res.status(201).send('User created!');
  });

  auth.post('/sign-in', async (req: Request<NonNullable<unknown>, NonNullable<unknown>, CreateUserDto>, res) => {
    const { email, password } = req.body;

    const signIn = getSignInUserCommand({
      logger,
      config,
      userRepository,
    });

    const user = await signIn({
      email,
      password,
    });

    if (user instanceof Error) {
      return res.status(500).send('Password or email is incorrect!');
    }

    const token = jwt.sign({ userId: user.id }, config.auth.jwtSecret, {
      expiresIn: config.auth.tokenAge,
      algorithm: 'HS256',
    });

    res.status(200).json({
      token,
    });
  });

  return auth;
};
