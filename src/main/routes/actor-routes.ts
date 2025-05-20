import { Router } from 'express';
import { adminAuth } from '../middlewares';
import { adaptMiddleware, adaptRoute } from '../adapters';

import {
  makeAddActorController,
  makeAddActorDataValidationMiddleware,
  makeDeleteActorController,
  makeUpdateActorController,
  makeUpdateActorDataValidationMiddleware,
} from '../factories';

export default (router: Router): void => {
  router.post(
    '/actors',
    adminAuth,
    adaptMiddleware(makeAddActorDataValidationMiddleware()),
    adaptRoute(makeAddActorController())
  );
  router.patch(
    '/actors/:id',
    adminAuth,
    adaptMiddleware(makeUpdateActorDataValidationMiddleware()),
    adaptRoute(makeUpdateActorController())
  );
  router.delete(
    '/actors/:id',
    adminAuth,
    adaptRoute(makeDeleteActorController())
  );
};
