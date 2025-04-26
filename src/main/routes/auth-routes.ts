import { Router } from 'express';
import { SignUpController } from '../../presentation/controllers/auth/signup/sign-up-controller';
import { FieldComparerImpl } from '../../utils/validations/field-comparer';
import { DbAddAccount } from '../../data/account/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/cryptography/bcrypt/bcrypt-adapter';
import { AccountRepository } from '../../infra/db/account/account-repository';
import { EmailValidatorImpl } from '../../infra/validations/email-validator/email-validator';
import { adaptRoute } from '../adapters/express-route-adapter';
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { ValidateData } from '../../presentation/middlewares/validation-middleware';
import { z } from 'zod';

const hasher = new BcryptAdapter(10);
const accountRepository = new AccountRepository();
const addAccount = new DbAddAccount(
  hasher,
  accountRepository,
  accountRepository
);
const fieldComparer = new FieldComparerImpl('password', 'passwordConfirmation'); //TODO: criar factory e validar com zod com adapter do middleware
const emailValidator = new EmailValidatorImpl();
const signUpController = new SignUpController(
  addAccount,
  fieldComparer,
  emailValidator
);

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  passwordConfirmation: z
    .string()
    .min(6, 'Password confirmation must be at least 6 characters long'),
});

export default (router: Router): void => {
  router.post(
    '/login',
    adaptMiddleware(new ValidateData(signUpSchema)),
    adaptRoute(signUpController)
  );
};
