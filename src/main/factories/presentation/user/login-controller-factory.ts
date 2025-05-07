import { LoginController } from '../../../../presentation/controllers/auth/login/login-controller';
import { makeAuthentication } from '../../data';

export const makeLoginController = (): LoginController => {
  return new LoginController(makeAuthentication());
};
