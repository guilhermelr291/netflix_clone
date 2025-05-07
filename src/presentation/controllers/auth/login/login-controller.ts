import { Authentication } from '../../../../domain/use-cases/user/authentication';
import { ok } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication) {}
  async handle(request: Authentication.Params): Promise<HttpResponse> {
    try {
      const { email, password } = request;
      const data = { email, password };

      const accessTokenAndUser = await this.authentication.auth(data);

      return ok(accessTokenAndUser);
    } catch (error) {
      console.error('Error on login: ', error);
      throw error;
    }
  }
}
