import { CheckAuth } from '../../../../presentation/middlewares/check-auth-middleware';

export const makeCheckAuthMiddleware = (): CheckAuth => {
  return new CheckAuth();
};
