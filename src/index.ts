import { createHttpInterface } from './interfaces/http';
import { Config } from './infrastructure/config';
import os from 'node:os';
import pino from 'pino';
import * as mongoose from 'mongoose';
import { UserRepository } from './infrastructure/mongo/repository/user-repository';
import { CsvDataRepository } from './infrastructure/mongo/repository/csv-data-repository';

async function main(): Promise<void> {
  const config = new Config();

  const logger = pino({
    name: 'main',
    base: {
      pid: process.pid,
      hostname: os.hostname(),
    },
  });

  await mongoose.connect(config.mongoDB.url);

  const userRepository = new UserRepository({ logger });
  const csvDataRepository = new CsvDataRepository({ logger });

  const express = await createHttpInterface({
    config,
    logger,
    userRepository,
    csvDataRepository,
  });

  express.listen(config.express.port);
}

main();
