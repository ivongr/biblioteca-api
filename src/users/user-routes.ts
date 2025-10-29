import { Router } from 'express';

import { HttpStatusCodes } from '../shared/entities/http-status-codes.ts';
import { deleteUser } from './uses-cases/delete-user.ts';
import { getUsers } from './uses-cases/get-users.ts';
import { saveUser } from './uses-cases/save-user.ts';
import { updateUser } from './uses-cases/update-user.ts';

export const userRoutes = Router();
const ROUTE = '/users';

userRoutes.get(ROUTE, async (_, res) => {
  try {
    const users = await getUsers();
    res.status(HttpStatusCodes.OK).json({
      data: users,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message,
    });
  }
});

userRoutes.post(ROUTE, async (req, res) => {
  try {
    const user = await saveUser({ user: req.body });

    res.status(HttpStatusCodes.OK).json({
      message: 'Usuario creado correctamente',
      data: user,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(HttpStatusCodes.BAD_REQUEST).json({ message });
  }
});

userRoutes.put(ROUTE, async (req, res) => {
  try {
    const user = await updateUser({ user: req.body });
    res.status(HttpStatusCodes.OK).json({
      message: 'Usuario actualizado correctamente',
      data: user,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      message,
    });
  }
});

userRoutes.delete(ROUTE + '/:id', async (req, res) => {
  try {
    const book = await deleteUser({ id: req.params.id });
    res.status(HttpStatusCodes.OK).json({
      message: 'Usuario eliminado correctamente',
      data: book,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      message,
    });
  }
});
