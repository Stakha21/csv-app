import { CsvDataDocument } from '../schema/csv-data.schema';
import { CsvData } from '../../../domain/csv-data';

export const toDomainCsvData = (mongoCsvData: CsvDataDocument): CsvData => {
  return {
    id: mongoCsvData._id,
    name: mongoCsvData.name,
    surname: mongoCsvData.surname,
    age: mongoCsvData.age,
    createdAt: mongoCsvData.createdAt,
    updatedAt: mongoCsvData.updatedAt,
  };
};
