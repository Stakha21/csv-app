import mongoose from 'mongoose';
import { User } from '../../../domain/user';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const UserSchema = new Schema<User>(
  {
    id: ObjectId,
    email: { type: String, unique: true },
    hash: String,
    salt: String,
  },
  {
    timestamps: true,
  },
);

export interface UserDocument extends mongoose.Document {
  email: string;
  salt: string;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
}
