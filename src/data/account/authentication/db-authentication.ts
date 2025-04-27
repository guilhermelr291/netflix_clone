import { Authentication } from '../../../domain/use-cases/account/authentication';

export class DbAuthentication implements Authentication {
  async auth(data: Authentication.Params): Promise<Authentication.Result> {
    return new Promise(resolve =>
      resolve({
        token: 'token',
        account: {
          name: '',
          email: '',
        },
      })
    );
  }
}
