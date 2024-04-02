import mongoose from 'mongoose';
import { CsvData } from '../../../domain/csv-data';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const CsvDataSchema = new Schema<CsvData>(
  {
    id: ObjectId,
    name: String,
    surname: String,
    age: Number,
  },
  {
    timestamps: true,
  },
);

export interface CsvDataDocument extends mongoose.Document {
  name: string;
  surname: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}
