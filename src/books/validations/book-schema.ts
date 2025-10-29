import { email, maxLength, nonEmpty, object, parse, pipe, string } from 'valibot';

import { IBook } from '../entities/books.ts';

export const bookSchema = object({
  title: pipe(
    string('El título no tiene un formato correcto'),
    maxLength(20, 'El título no puede sobrepasar de 20 caracteres'),
    nonEmpty('El título es requerido')
  ),
  autor: pipe(
    string('El nombre del autor tiene un mal formato.'),
    nonEmpty('El nombre del autor es requerido.'),
    maxLength(30, 'El nombre del autor  no puede sobrepasar de los 30 caracteres.')
  ),
});

export function parseBook(user: IBook) {
  return parse(bookSchema, user);
}
