import { AccountRepository } from '../../../infra/db/account/account-repository';

export const makeAccountRepository = (): AccountRepository => {
  return new AccountRepository();
};
