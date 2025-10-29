import { dbBiblioteca } from '../../config/connect-db.ts';
import { COLLECTIONS } from '../../shared/constants/db-collections.ts';
import type { IUser } from '../entities/user.ts';

export async function saveUser(props: { user: IUser }): Promise<IUser> {
  const { _id, ...userWithoutId } = props.user;

  const result = await dbBiblioteca.collection(COLLECTIONS.users).insertOne(userWithoutId);

  return {
    _id: result.insertedId.toString(),
    email: userWithoutId.email,
    name: userWithoutId.name,
  };
}
