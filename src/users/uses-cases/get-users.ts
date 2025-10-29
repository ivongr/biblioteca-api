import { dbBiblioteca } from '../../config/connect-db.ts';
import { COLLECTIONS } from '../../shared/constants/db-collections.ts';
import type { IUser } from '../entities/user.ts';

export async function getUsers(): Promise<IUser[]> {
  const users = await dbBiblioteca.collection<IUser>(COLLECTIONS.users).find().toArray();
  console.log(`usuarios recibidos ${users.length}`);
  return users;
}
