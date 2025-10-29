import { ObjectId } from 'mongodb';

import { dbBiblioteca } from '../../config/connect-db.ts';
import { COLLECTIONS } from '../../shared/constants/db-collections.ts';
import { IBook } from '../entities/books.ts';

export async function updateBook(props: { book: IBook }): Promise<IBook> {
  const { book } = props;

  if (!book._id) {
    throw new Error('El libro debe tener un _id para actualizar');
  }

  const objectId = new ObjectId(book._id);

  const result = await dbBiblioteca.collection<IBook>(COLLECTIONS.books).findOneAndUpdate(
    { _id: objectId },
    {
      $set: {
        autor: book.autor,
        title: book.title,
      },
    },
    { returnDocument: 'after' }
  );

  if (!result) {
    throw new Error('Libro no encontrado');
  }

  console.info('Libro actualizado correctamente');

  return result;
}
