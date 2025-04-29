import { Authentication } from '../../../../domain/use-cases/account/authentication';
import { ok } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication) {}
  async handle(request: Authentication.Params): Promise<HttpResponse> {
    try {
      const { email, password } = request;
      const data = { email, password };

      const accessTokenAndAccount = await this.authentication.auth(data);

      return ok('');
    } catch (error) {
      console.error('Error on login: ', error);
      throw error;
    }
  }
}
