import { UserRepository } from '../../../infra/db/user/user-repository';

export const makeUserRepository = (): UserRepository => {
  return new UserRepository();
};
