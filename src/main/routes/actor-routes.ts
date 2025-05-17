import { Router } from 'express';
import { adminAuth } from '../middlewares';
import { adaptMiddleware, adaptRoute } from '../adapters';
import { makeAddActorController } from '../factories/presentation/actor/add-actor-controller-factory';
import { makeAddActorDataValidationMiddleware } from '../factories/middlewares/actor/add-actor-middleware-factory';

export default (router: Router): void => {
  router.post(
    '/actors',
    adminAuth,
    adaptMiddleware(makeAddActorDataValidationMiddleware()),
    adaptRoute(makeAddActorController())
  );
};
