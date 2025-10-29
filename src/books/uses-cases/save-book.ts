import { ObjectId } from 'mongodb';

import { dbBiblioteca } from '../../config/connect-db.ts';
import { COLLECTIONS } from '../../shared/constants/db-collections.ts';
import { IBook } from '../entities/books.ts';
import { parseBook } from '../validations/book-schema.ts';

export async function saveBook(props: { book: IBook }): Promise<IBook> {
  const parsedBook = parseBook(props.book);

  const userExists = await dbBiblioteca
    .collection(COLLECTIONS.users)
    .findOne({ _id: new ObjectId(parsedBook.idUser) });

  if (!userExists) {
    throw new Error('Usuario no encontrado');
  }

  const existingBook = await dbBiblioteca.collection<IBook>(COLLECTIONS.books).findOne({
    idUser: new ObjectId(parsedBook.idUser),
    title: parsedBook.title,
    autor: parsedBook.autor,
  });

  if (existingBook) {
    throw new Error('Este libro ya existe para este usuario');
  }

  const saveBook = {
    title: parsedBook.title,
    autor: parsedBook.autor,
    idUser: new ObjectId(parsedBook.idUser),
  };

  const result = await dbBiblioteca.collection(COLLECTIONS.books).insertOne(saveBook);

  return {
    _id: result.insertedId.toString(),
    autor: parsedBook.autor,
    title: parsedBook.title,
    idUser: parsedBook.idUser,
  };
}
