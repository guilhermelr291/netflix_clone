import { CheckAuth } from '../../../../presentation/middlewares/check-auth-middleware';
import { makeDbLoadUserByToken } from '../../data/user/db-load-user-by-token';

export const makeCheckAuthMiddleware = (role?: string): CheckAuth => {
  return new CheckAuth(makeDbLoadUserByToken(), role);
};
