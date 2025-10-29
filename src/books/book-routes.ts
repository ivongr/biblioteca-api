import { Router } from 'express';

import { HttpStatusCodes } from '../shared/entities/http-status-codes.ts';
import { deleteBook } from './uses-cases/delete-book.ts';
import { findBookByIdUser } from './uses-cases/find-book-by-id-user.ts';
import { getBooks } from './uses-cases/get-books.ts';
import { saveBook } from './uses-cases/save-book.ts';
import { updateBook } from './uses-cases/update-book.ts';

export const bookRoutes = Router();
const ROUTE = '/books';

bookRoutes.get(ROUTE, async (_, res) => {
  try {
    const books = await getBooks();
    res.status(HttpStatusCodes.OK).json({
      data: books,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message,
    });
  }
});

bookRoutes.get(ROUTE + '/user/:userId', async (req, res) => {
  try {
    const books = await findBookByIdUser({ idUser: req.params.userId });
    res.status(HttpStatusCodes.OK).json({
      data: books,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      message,
    });
  }
});

bookRoutes.post(ROUTE, async (req, res) => {
  try {
    const book = await saveBook({ book: req.body });
    res.status(HttpStatusCodes.CREATED).json({
      message: 'Libro creado correctamente',
      data: book,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      message,
    });
  }
});

bookRoutes.put(ROUTE, async (req, res) => {
  try {
    const book = await updateBook({ book: req.body });
    res.status(HttpStatusCodes.OK).json({
      message: 'Libro actualizado correctamente',
      data: book,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      message,
    });
  }
});

bookRoutes.delete(ROUTE + '/:id', async (req, res) => {
  try {
    const book = await deleteBook({ id: req.params.id });
    res.status(HttpStatusCodes.OK).json({
      message: 'Libro eliminado correctamente',
      data: book,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      message,
    });
  }
});
