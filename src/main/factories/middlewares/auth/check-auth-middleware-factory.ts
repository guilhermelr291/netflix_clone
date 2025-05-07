import { CheckAuth } from '../../../../presentation/middlewares/check-auth-middleware';
import { makeDbLoadUserByToken } from '../../data/user/db-load-user-by-token';

export const makeCheckAuthMiddleware = (role: 'USER' | 'ADMIN'): CheckAuth => {
  return new CheckAuth(makeDbLoadUserByToken(), role);
};
