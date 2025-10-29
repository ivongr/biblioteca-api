import { dbBiblioteca } from '../../config/connect-db.ts';
import { COLLECTIONS } from '../../shared/constants/db-collections.ts';
import { IBook } from '../entities/books.ts';

export async function getBooks(): Promise<IBook[]> {
  const books = await dbBiblioteca.collection<IBook>(COLLECTIONS.books).find().toArray();
  console.info(`libros recibidos ${books.length}`);
  return books;
}
