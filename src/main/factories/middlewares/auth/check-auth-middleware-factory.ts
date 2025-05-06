import { CheckAuth } from '../../../../presentation/middlewares/check-auth-middleware';
import { makeDbLoadAccountByToken } from '../../data/account/db-load-account-by-token';

export const makeCheckAuthMiddleware = (): CheckAuth => {
  return new CheckAuth(makeDbLoadAccountByToken());
};
