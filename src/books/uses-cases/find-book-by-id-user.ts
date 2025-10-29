import { ObjectId } from 'mongodb';

import { dbBiblioteca } from '../../config/connect-db.ts';
import { COLLECTIONS } from '../../shared/constants/db-collections.ts';
import { IBook } from '../entities/books.ts';

export async function findBookByIdUser(props: { idUser: string }): Promise<IBook[]> {
  const { idUser } = props;

  const objectId = new ObjectId(idUser);

  const books = await dbBiblioteca
    .collection<IBook>(COLLECTIONS.books)
    .find({ idUser: objectId })
    .toArray();

  console.info(`Libros recibidos por usuario: ${books.length}`);

  return books;
}
