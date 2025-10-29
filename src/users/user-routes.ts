import { Router } from 'express';

import { HttpStatusCodes } from '../shared/entities/http-status-codes.ts';
import { deleteUser } from './uses-cases/delete-user.ts';
import { getUsers } from './uses-cases/get-users.ts';
import { saveUser } from './uses-cases/save-user.ts';
import { updateUser } from './uses-cases/update-user.ts';
import { message } from 'valibot';

export const userRoutes = Router();
const ROUTE = '/users';

userRoutes.get(ROUTE, async (_, res) => {
  return getUsers().then((resp) => {
    res.json(resp).status(HttpStatusCodes.OK);
  });
});

userRoutes.post(ROUTE, async (req, res) => {
  try {
    const user = await saveUser({ user: req.body });

    res.status(HttpStatusCodes.OK).json({
      success: true,
      message: 'Usuario creado correctamente',
      data: user,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(HttpStatusCodes.BAD_REQUEST).json({ message });
  }
});

userRoutes.put(ROUTE, async (req, res) => {
  return updateUser({ user: req.body }).then((resp) => {
    res.json(resp).status(HttpStatusCodes.OK);
  });
});

userRoutes.delete(ROUTE + '/:id', async (req, res) => {
  return deleteUser({ id: req.params.id }).then((resp) => {
    res.json(resp).status(HttpStatusCodes.OK);
  });
});
