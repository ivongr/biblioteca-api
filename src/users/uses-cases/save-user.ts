import { dbBiblioteca } from '../../config/connect-db.ts';
import { COLLECTIONS } from '../../shared/constants/db-collections.ts';
import { IUser } from '../entities/user.ts';
import { parseUser } from '../validations/user-schema.ts';

export async function saveUser(props: { user: IUser }): Promise<IUser> {
  const parsedUser = parseUser(props.user);

  const result = await dbBiblioteca.collection(COLLECTIONS.users).insertOne(parsedUser);

  return {
    _id: result.insertedId.toString(),
    email: parsedUser.email,
    name: parsedUser.name,
  };
}
