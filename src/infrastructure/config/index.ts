import path from 'node:path';
import dotenv from 'dotenv';
import * as process from 'process';

const rootDirectory = path.resolve(__dirname, '../../..');

dotenv.config({ path: path.resolve(rootDirectory, '.env') });

export class Config {
  public readonly express: {
    readonly host: string;
    readonly port: number;
    readonly prefix: string;
  };

  public readonly mongoDB: {
    url: string;
  };

  public readonly auth: {
    salt: string;
    jwtSecret: string;
    tokenAge: number;
  };

  constructor() {
    this.express = {
      host: process.env.EXPRESS_HOST ?? '127.0.0.1',
      port: this.toInt(process.env.EXPRESS_PORT ?? '', 3000),
      prefix: process.env.EXPRESS_PREFIX ?? '/api',
    };

    this.mongoDB = {
      url: process.env.DB_URL ?? '',
    };

    this.auth = {
      salt: process.env.SALT ?? '',
      jwtSecret: process.env.JWT_SECRET ?? '',
      tokenAge: this.toInt(process.env.TOKEN_AGE ?? '', 36000),
    };
  }

  private toInt(mayBeNumber: string, defaultValue: number): number {
    const number = Number.parseFloat(mayBeNumber);

    if (Number.isNaN(number)) {
      return defaultValue;
    }

    if (Number.isFinite(number)) {
      return number;
    }

    return defaultValue;
  }
}
