import { SignUpController } from '../../../../presentation/controllers/auth/signup/sign-up-controller';
import { makeDbAddUser } from '../../data';
import { makeFieldComparer } from '../../utils/field-comparer-factory';

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeDbAddUser(), makeFieldComparer());
};
