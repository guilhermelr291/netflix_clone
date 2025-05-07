import { DbAddUser } from '../../../../data/user/add-user/db-add-user';
import { makeHasher } from '../../infra/hasher';
import { makeUserRepository } from '../../infra/user-repository-factory';

export const makeAddUser = (): DbAddUser => {
  return new DbAddUser(
    makeHasher(),
    makeUserRepository(),
    makeUserRepository()
  );
};
