import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { makeCheckAuthMiddleware } from '../factories/middlewares/auth/check-auth-middleware-factory';

export const adminAuth = adaptMiddleware(makeCheckAuthMiddleware('ADMIN'));
