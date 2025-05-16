import { Router } from 'express';
import { adminAuth, auth } from '../middlewares';
import { adaptMiddleware, adaptRoute } from '../adapters';
import {
  makeAddEpisodeController,
  makeAddEpisodeDataValidationMiddleware,
  makeDeleteEpisodeController,
  makeLoadEpisodeByIdController,
} from '../factories';

export default (router: Router): void => {
  router.post(
    '/episodes',
    adminAuth,
    adaptMiddleware(makeAddEpisodeDataValidationMiddleware()),
    adaptRoute(makeAddEpisodeController())
  );
  router.delete(
    '/episodes/:id',
    adminAuth,
    adaptRoute(makeDeleteEpisodeController())
  );
  router.get(
    '/episodes/:id',
    auth,
    adaptRoute(makeLoadEpisodeByIdController())
  );
};
