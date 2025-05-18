import { Router } from 'express';
import { adminAuth } from '../middlewares';
import { adaptMiddleware, adaptRoute } from '../adapters';

import { makeAddActorDataValidationMiddleware } from '../factories/middlewares/actor/add-actor-middleware-factory';
import {
  makeAddActorController,
  makeDeleteActorController,
} from '../factories';

export default (router: Router): void => {
  router.post(
    '/actors',
    adminAuth,
    adaptMiddleware(makeAddActorDataValidationMiddleware()),
    adaptRoute(makeAddActorController())
  );
  router.delete(
    '/actors/:id',
    adminAuth,
    adaptRoute(makeDeleteActorController())
  );
};
