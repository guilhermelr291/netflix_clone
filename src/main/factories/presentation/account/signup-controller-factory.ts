import { SignUpController } from '../../../../presentation/controllers/auth/signup/sign-up-controller';
import { makeAddAccount } from '../../data';
import { makeFieldComparer } from '../../utils/field-comparer-factory';

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeAddAccount(), makeFieldComparer());
};
