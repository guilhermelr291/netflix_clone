import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import {
  makeAddMovieController,
  makeAddMovieDataValidationMiddleware,
} from '../factories';
import { makeCheckAuthMiddleware } from '../factories/middlewares/auth/check-auth-middleware-factory';

export default (router: Router): void => {
  router.use(adaptMiddleware(makeCheckAuthMiddleware()));

  router.post(
    '/movies',
    adaptMiddleware(makeAddMovieDataValidationMiddleware()),
    adaptRoute(makeAddMovieController())
  );
};
