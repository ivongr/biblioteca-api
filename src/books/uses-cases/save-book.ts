import { dbBiblioteca } from '../../config/connect-db.ts';
import { COLLECTIONS } from '../../shared/constants/db-collections.ts';
import { IBook } from '../entities/books.ts';
import { parseBook } from '../validations/book-schema.ts';

export async function saveBook(props: { user: IBook }): Promise<IBook> {
  const parsedBook = parseBook(props.user);

  const result = await dbBiblioteca.collection(COLLECTIONS.books).insertOne(parsedBook);

  return {
    _id: result.insertedId.toString(),
    autor: parsedBook.autor,
    title: parsedBook.title,
  };
}
