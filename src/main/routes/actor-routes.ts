import { Router } from 'express';
import { adminAuth, auth } from '../middlewares';
import { adaptMiddleware, adaptRoute } from '../adapters';

import {
  makeAddActorController,
  makeAddActorDataValidationMiddleware,
  makeDeleteActorController,
  makeUpdateActorController,
  makeUpdateActorDataValidationMiddleware,
} from '../factories';
import { makeLoadActorByIdController } from '../factories/presentation/actor/load-actor-by-id-controller-factory';

export default (router: Router): void => {
  router.post(
    '/actors',
    adminAuth,
    adaptMiddleware(makeAddActorDataValidationMiddleware()),
    adaptRoute(makeAddActorController())
  );
  router.get('/actors/:id', auth, adaptRoute(makeLoadActorByIdController()));

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
