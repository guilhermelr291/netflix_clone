import { UserModel } from '../../../domain/models/user';

export interface LoadUserByIdRepository {
  loadById(id: number, role?: string): Promise<UserModel | null>;
}
