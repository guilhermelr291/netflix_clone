import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import {
  makeSignUpDataValidationMiddleware,
  makeSignUpController,
  makeLoginController,
  makeLoginDataValidationMiddleware,
} from '../factories';

export default (router: Router): void => {
  router.post(
    '/signup',
    adaptMiddleware(makeSignUpDataValidationMiddleware()),
    adaptRoute(makeSignUpController())
  );
  router.post(
    '/login',
    adaptMiddleware(makeLoginDataValidationMiddleware()),
    adaptRoute(makeLoginController())
  );
};
