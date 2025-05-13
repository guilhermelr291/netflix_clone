import { DbAuthentication } from '../../../../data/user/authentication/db-authentication';
import { makeEncrypter } from '../../infra/encrypter';
import { makeHasher } from '../../infra/hasher';
import { makeUserRepository } from '../../infra/user-repository-factory';

export const makeDbAuthentication = (): DbAuthentication => {
  return new DbAuthentication(
    makeUserRepository(),
    makeHasher(),
    makeEncrypter()
  );
};
