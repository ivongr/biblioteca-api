import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

import { DATABASE } from '../shared/constants/db-collections.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
export const client = new MongoClient(MONGO_URI);
export let dbBiblioteca: Db;

export async function connectDB() {
  await client.connect();
  dbBiblioteca = client.db(DATABASE);
  console.log('Conectando mongodb');
}
