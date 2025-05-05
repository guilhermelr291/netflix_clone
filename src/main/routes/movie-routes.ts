import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import {
  makeAddMovieController,
  makeAddMovieDataValidationMiddleware,
} from '../factories';

export default (router: Router): void => {
  router.use();

  router.post(
    '/movies',
    adaptMiddleware(makeAddMovieDataValidationMiddleware()),
    adaptRoute(makeAddMovieController())
  );
};
