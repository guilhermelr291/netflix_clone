import { Authentication } from '../../../domain/use-cases/account/authentication';
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth(data: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      data.email
    );

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
