import { UserModel } from '../../models/user';

export interface LoadUserByToken {
  loadByToken(token: string): Promise<UserModel | null>;
}
