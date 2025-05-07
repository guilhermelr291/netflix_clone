import { makeUserRepository } from '../../infra/user-repository-factory';
import { DbLoadUserByToken } from '../../../../data/user/load-user-by-token/db-load-user-by-token';
import { makeDecrypter } from '../../infra/decrypter';

export const makeDbLoadUserByToken = (): DbLoadUserByToken => {
  return new DbLoadUserByToken(makeUserRepository(), makeDecrypter());
};
