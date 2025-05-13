import { LoginController } from '../../../../presentation/controllers/auth/login/login-controller';
import { makeDbAuthentication } from '../../data';

export const makeLoginController = (): LoginController => {
  return new LoginController(makeDbAuthentication());
};
