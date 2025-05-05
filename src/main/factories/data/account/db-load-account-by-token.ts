import { makeAccountRepository } from '../../infra/account-repository-factory';
import { DbLoadAccountByToken } from '../../../../data/account/load-account-by-token/db-load-account-by-token';
import { makeDecrypter } from '../../infra/decrypter';

export const makeDbLoadAccountByToken = (): DbLoadAccountByToken => {
  return new DbLoadAccountByToken(makeAccountRepository(), makeDecrypter());
};
