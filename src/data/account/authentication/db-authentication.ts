import { Authentication } from '../../../domain/use-cases/account/authentication';
import { UnauthorizedError } from '../../../shared/errors';
import { HashComparer } from '../../protocols/hash-comparer';
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth(data: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      data.email
    );

    if (!account) throw new UnauthorizedError('incorrect email or password');

    const passwordMatches = await this.hashComparer.compare(
      account.password,
      data.password
    );

    if (!passwordMatches)
      throw new UnauthorizedError('incorrect email or password');

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
