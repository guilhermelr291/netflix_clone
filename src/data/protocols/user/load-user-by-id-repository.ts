import { UserModel } from '../../../domain/models/user';

export interface LoadUserByIdRepository {
  loadById(id: string, role?: string): Promise<UserModel | null>;
}
