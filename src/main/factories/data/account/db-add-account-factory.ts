import { DbAddAccount } from '../../../../data/account/add-account/db-add-account';
import { makeHasher } from '../../infra/hasher';
import { makeAccountRepository } from '../../infra/account-repository-factory';

export const makeAddAccount = (): DbAddAccount => {
  return new DbAddAccount(
    makeHasher(),
    makeAccountRepository(),
    makeAccountRepository()
  );
};
