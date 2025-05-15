import { Router } from 'express';
import { adminAuth } from '../middlewares/admin-auth-middleware';
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddEpisodeController } from '../factories/presentation/episode/add-episode-controller-factory';
import { makeAddEpisodeDataValidationMiddleware } from '../factories/middlewares/episode/add-episode-middleware-factory';

export default (router: Router): void => {
  router.post(
    '/episodes',
    adminAuth,
    adaptMiddleware(makeAddEpisodeDataValidationMiddleware()),
    adaptRoute(makeAddEpisodeController())
  );
};
