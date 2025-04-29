import { SignUpController } from '../../../presentation/controllers/auth/signup/sign-up-controller';
import { makeAddAccount } from '../data/db-add-account-factory';
import { makeFieldComparer } from '../utils/field-comparer-factory';

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeAddAccount(), makeFieldComparer());
};
