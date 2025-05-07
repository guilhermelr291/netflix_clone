import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import {
  makeAddMovieController,
  makeAddMovieDataValidationMiddleware,
} from '../factories';

import { adminAuth } from '../middlewares/admin-auth-middleware';

export default (router: Router): void => {
  router.use(adminAuth);

  router.post(
    '/movies',
    adaptMiddleware(makeAddMovieDataValidationMiddleware()),
    adaptRoute(makeAddMovieController())
  );
};
