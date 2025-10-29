import { Router } from 'express';

import { HttpStatusCodes } from '../shared/entities/http-status-codes.ts';
import { getBooks } from './uses-cases/get-books.ts';
import { saveBook } from './uses-cases/save-book.ts';
import { updateBook } from './uses-cases/update-book.ts';
import { deleteBook } from './uses-cases/delete-book.ts';

export const bookRoutes = Router();
const ROUTE = '/books';

bookRoutes.get(ROUTE, async (_, res) => {
  return getBooks().then((resp) => {
    res.json(resp).status(HttpStatusCodes.OK);
  });
});

bookRoutes.post(ROUTE, async (req, res) => {
  try {
    const user = await saveBook({ user: req.body });

    res.status(HttpStatusCodes.OK).json({
      message: 'Libro creado correctamente',
      data: user,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(HttpStatusCodes.BAD_REQUEST).json({ message });
  }
});

bookRoutes.put(ROUTE, async (req, res) => {
  return updateBook({ book: req.body }).then((resp) => {
    res.json(resp).status(HttpStatusCodes.OK);
  });
});

bookRoutes.delete(ROUTE + '/:id', async (req, res) => {
  return deleteBook({ id: req.params.id }).then((resp) => {
    res.json(resp).status(HttpStatusCodes.OK);
  });
});
