import crypto from 'node:crypto';

export const hash = async (secret: string, salt: string) => {
  return crypto.pbkdf2Sync(secret, salt, 1000, 120, 'sha512').toString('hex');
};
