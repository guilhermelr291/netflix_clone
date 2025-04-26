import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { adaptMiddleware } from '../adapters/express-middleware-adapter';

import {
  makeSignUpController,
  makeValidateDataMiddleware,
} from '../factories/account-factories';

export default (router: Router): void => {
  router.post(
    '/signup',
    adaptMiddleware(makeValidateDataMiddleware()),
    adaptRoute(makeSignUpController())
  );
};
