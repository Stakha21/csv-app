import { Config } from '../../infrastructure/config';
import { hash } from './create-hash';

export type ComparePasswordsParameters = {
  config: Config;
  password: string;
  salt: string;
  originalPasswordHash: string;
};

export const comparePasswords = async ({
  config,
  password,
  salt,
  originalPasswordHash,
}: ComparePasswordsParameters) => {
  const saltWithMagic = await hash(salt, config.auth.salt);
  const passwordHash = await hash(password, saltWithMagic);

  return passwordHash === originalPasswordHash;
};
