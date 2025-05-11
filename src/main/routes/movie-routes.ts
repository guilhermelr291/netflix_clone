import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import {
  makeAddMovieController,
  makeAddMovieDataValidationMiddleware,
  makeDeleteMovieController,
} from '../factories';

import { adminAuth } from '../middlewares/admin-auth-middleware';
import { makeLoadMoviesController } from '../factories/presentation/movie/load-movies-controller-factory';
import { auth } from '../middlewares/auth-middleware';

export default (router: Router): void => {
  router.post(
    '/movies',
    adminAuth,
    adaptMiddleware(makeAddMovieDataValidationMiddleware()),
    adaptRoute(makeAddMovieController())
  );
  router.delete(
    '/movies/:id',
    adminAuth,
    adaptRoute(makeDeleteMovieController())
  );

  router.get('/movies', auth, adaptRoute(makeLoadMoviesController()));
};
