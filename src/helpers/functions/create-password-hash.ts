import crypto from 'node:crypto';
import { Config } from '../../infrastructure/config';
import { Logger } from 'pino';
import { hash } from './create-hash';

export type CreatePasswordHashParams = {
  config: Config;
  logger: Logger;
  password: string;
};

export const createPasswordHash = async ({ config, password }: CreatePasswordHashParams) => {
  const salt = crypto.randomBytes(20).toString('hex');
  const saltWithMagic = await hash(salt, config.auth.salt);
  const passwordHash = await hash(password, saltWithMagic);

  return { salt, passwordHash };
};
