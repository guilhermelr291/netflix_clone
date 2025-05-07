import { AddUser } from '../../../domain/use-cases/user/add-user';

export interface AddUserRepository {
  add(data: AddUser.Params): Promise<void>;
}
