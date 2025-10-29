import { email, maxLength, nonEmpty, object, parse, pipe, string } from 'valibot';

import { IUser } from '../entities/user.ts';

export const userSchema = object({
  name: pipe(
    string('El nombre no tiene un formato correcto'),
    maxLength(20, 'El nombre no puede sobrepasar de 20 caracteres'),
    nonEmpty('El nombre es requerido')
  ),
  email: pipe(
    string(),
    nonEmpty('El email es requerido.'),
    email('El email tiene un mal formato.'),
    maxLength(30, 'El email no puede sobrepasar de los 30 caracteres.')
  ),
});

export function parseUser(user: IUser) {
  return parse(userSchema, user);
}
