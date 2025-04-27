import { DbAuthentication } from '../../../../data/account/authentication/db-authentication';
import { ok } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class LoginController implements Controller {
  constructor(private readonly dbAuthentication: DbAuthentication) {}
  async handle(request: any): Promise<HttpResponse> {
    return ok('');
  }
}
