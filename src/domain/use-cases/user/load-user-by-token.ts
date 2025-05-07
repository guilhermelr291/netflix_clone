import { UserModel } from '../../models/user';

export interface LoadUserByToken {
  loadByToken(token: string, role: string): Promise<UserModel | null>;
}
