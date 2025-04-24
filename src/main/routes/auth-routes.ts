import { Router } from 'express';
import { SignUpController } from '../../presentation/controllers/auth/signup/sign-up-controller';
import { FieldComparerImpl } from '../../utils/validations/field-comparer';
import { DbAddAccount } from '../../data/account/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/cryptography/bcrypt/bcrypt-adapter';
import { AccountRepository } from '../../infra/db/account/account-repository';
import { EmailValidatorImpl } from '../../infra/validations/email-validator/email-validator';
import { adaptRoute } from '../adapters/express-route-adapter';

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

export default (router: Router): void => {
  router.post('/login', adaptRoute(signUpController));
};
