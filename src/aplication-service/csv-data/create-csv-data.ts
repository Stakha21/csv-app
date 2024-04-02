import { Logger } from 'pino';
import { ErrorType } from '../../helpers/types/error-types';
import { CsvDataDto } from '../../interfaces/http/routers/cvs/dto/csv-data.dto';
import { ICsvDataRepository } from '../../ports/csv-data-repository';
import * as console from 'console';

type CreateCsvDataParameters = {
  logger: Logger;
  data: CsvDataDto[];
  csvDataRepository: ICsvDataRepository;
};

export const createCsvData = async ({
  logger,
  data,
  csvDataRepository,
}: CreateCsvDataParameters): Promise<void | Error> => {
  const csvPreparedData = data.map((obj) => {
    return {
      ...obj,
      age: +obj.age,
    };
  });

  console.log(csvPreparedData);

  const result = await csvDataRepository.create(csvPreparedData);

  if (result instanceof Error) {
    logger.error({ data }, 'Something went wrong while creating csv data 🚨');

    return new Error(ErrorType.UNEXPECTED_BEHAVIOR);
  }
};
