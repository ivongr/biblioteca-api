import { ObjectId } from 'mongodb';

export interface IBook {
  _id: string | ObjectId;
  title: string;
  autor: string;
}
