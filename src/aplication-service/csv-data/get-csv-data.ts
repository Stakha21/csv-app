import { ICsvDataRepository } from '../../ports/csv-data-repository';
import { CsvData } from '../../domain/csv-data';

type GetCsvDataParameters = {
  csvDataRepository: ICsvDataRepository;
};

export const getCsvData = async ({ csvDataRepository }: GetCsvDataParameters): Promise<CsvData[] | Error> => {
  return csvDataRepository.get();
};
