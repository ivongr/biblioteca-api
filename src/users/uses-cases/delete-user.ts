import { ObjectId } from 'mongodb';

import { dbBiblioteca } from '../../config/connect-db.ts';
import { COLLECTIONS } from '../../shared/constants/db-collections.ts';
import { IUser } from '../entities/user.ts';

export async function deleteUser(props: { id: string }): Promise<IUser> {
  const { id } = props;

  const objectId = new ObjectId(id);

  const result = await dbBiblioteca
    .collection<IUser>(COLLECTIONS.users)
    .findOneAndDelete({ _id: objectId });

  if (result === null) {
    throw new Error('Usuario no encontrado');
  }

  console.info('Usuario eliminado exitosamente');

  return result;
}
