import { ObjectId } from 'mongodb';

import { dbBiblioteca } from '../../config/connect-db.ts';
import { COLLECTIONS } from '../../shared/constants/db-collections.ts';
import { IUser } from '../entities/user.ts';

export async function updateUser(props: { user: IUser }): Promise<IUser> {
  const { user } = props;

  if (!user._id) {
    throw new Error('El usuario debe tener un _id para actualizar');
  }

  const objectId = new ObjectId(user._id);

  const result = await dbBiblioteca.collection<IUser>(COLLECTIONS.users).findOneAndUpdate(
    { _id: objectId },
    {
      $set: {
        name: user.name,
        email: user.email,
      },
    },
    { returnDocument: 'after' }
  );

  if (!result) {
    throw new Error('Usuario no encontrado');
  }

  console.info('Usuario actualizado correctamente');

  return result;
}
