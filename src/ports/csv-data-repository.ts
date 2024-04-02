import { CsvData } from '../domain/csv-data';

export type CreateCsvDataParameters = Pick<CsvData, 'name' | 'surname' | 'age'>;

export interface ICsvDataRepository {
  create(parameters: CreateCsvDataParameters[]): Promise<CsvData[] | Error>;

  get(): Promise<CsvData[] | Error>;
}
