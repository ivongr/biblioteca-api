import { ObjectId } from 'mongodb';

import { dbBiblioteca } from '../../config/connect-db.ts';
import { COLLECTIONS } from '../../shared/constants/db-collections.ts';
import { IBook } from '../entities/books.ts';

export async function deleteBook(props: { id: string }): Promise<IBook> {
  const { id } = props;

  const objectId = new ObjectId(id);

  const result = await dbBiblioteca
    .collection<IBook>(COLLECTIONS.books)
    .findOneAndDelete({ _id: objectId });

  if (result === null) {
    throw new Error('Libro no encontrado');
  }

  console.info('Libro eliminado exitosamente');

  return result;
}
