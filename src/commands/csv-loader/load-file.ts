import { Logger } from 'pino';

import { Command } from '../../helpers/types/command';
import { CsvDataDto } from '../../interfaces/http/routers/cvs/dto/csv-data.dto';
import { ICsvDataRepository } from '../../ports/csv-data-repository';
import { createCsvData } from '../../aplication-service/csv-data/create-csv-data';

type GetLoadFileCommandParameters = {
  logger: Logger;
  csvDataRepository: ICsvDataRepository;
};

type Parameters = {
  data: CsvDataDto[];
};

type Output = void | Error;

export const getLoadFileCommand = (
  commandParameters: GetLoadFileCommandParameters,
): Command<Parameters, Promise<Output>> => {
  return async (parameters: Parameters): Promise<Output> => {
    return createCsvData({ ...parameters, ...commandParameters });
  };
};
