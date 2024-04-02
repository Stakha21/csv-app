import { Logger } from 'pino';
import mongoose, { Model } from 'mongoose';
import { ErrorType } from '../../../helpers/types/error-types';
import { CreateCsvDataParameters, ICsvDataRepository } from '../../../ports/csv-data-repository';
import { CsvDataSchema } from '../schema/csv-data.schema';
import { CsvData } from '../../../domain/csv-data';
import { toDomainCsvData } from '../mapper/csv-data-mapper';

export type CsvDataRepositoryParameters = {
  logger: Logger;
};

export class CsvDataRepository implements ICsvDataRepository {
  private logger: Logger;
  private csvModel: Model<CsvData>;

  constructor({ logger }: CsvDataRepositoryParameters) {
    this.logger = logger.child({ name: 'CsvDataRepository' });
    this.csvModel = mongoose.model('CsvDataModel', CsvDataSchema);
  }

  async create(parameters: CreateCsvDataParameters[]): Promise<CsvData[] | Error> {
    try {
      await this.csvModel.deleteMany();
      const csvDataMongo = await this.csvModel.create(parameters);

      return csvDataMongo.map((obj) => toDomainCsvData(obj));
    } catch (error) {
      this.logger.error({ parameters, err: error }, 'The csv data was not created 🚨');

      return new Error(ErrorType.UNEXPECTED_BEHAVIOR);
    }
  }

  async get(): Promise<CsvData[] | Error> {
    try {
      const csvDataMongo = await this.csvModel.find();

      return csvDataMongo.map((obj) => toDomainCsvData(obj));
    } catch (error) {
      this.logger.error({ err: error }, 'The csv data was not found 🚨');

      return new Error(ErrorType.UNEXPECTED_BEHAVIOR);
    }
  }
}
