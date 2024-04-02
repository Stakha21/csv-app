import { ICsvDataRepository } from '../../ports/csv-data-repository';
import { Query } from '../../helpers/types/query';
import { CsvData } from '../../domain/csv-data';
import { getCsvData } from '../../aplication-service/csv-data/get-csv-data';

type GetCsvDataQueryParameters = {
  csvDataRepository: ICsvDataRepository;
};

type Parameters = void;

type Output = CsvData[] | Error;

export const getGetCsvDataQuery = (
  commandParameters: GetCsvDataQueryParameters,
): Query<Parameters, Promise<Output>> => {
  return async (): Promise<Output> => {
    return getCsvData({ ...commandParameters });
  };
};
