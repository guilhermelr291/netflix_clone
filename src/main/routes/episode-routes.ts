import { Router } from 'express';
import { adminAuth } from '../middlewares/admin-auth-middleware';
import { adaptMiddleware, adaptRoute } from '../adapters';
import {
  makeAddEpisodeController,
  makeAddEpisodeDataValidationMiddleware,
  makeDeleteEpisodeController,
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
};
