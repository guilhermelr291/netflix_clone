import { DbAuthentication } from '../../../../data/account/authentication/db-authentication';
import { makeEncrypter } from '../../infra/encrypter';
import { makeHasher } from '../../infra/hasher';
import { makeAccountRepository } from '../../infra/account-repository-factory';

export const makeAuthentication = (): DbAuthentication => {
  return new DbAuthentication(
    makeAccountRepository(),
    makeHasher(),
    makeEncrypter()
  );
};
