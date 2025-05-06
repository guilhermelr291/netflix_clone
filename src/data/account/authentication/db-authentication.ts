import { Authentication } from '../../../domain/use-cases/account/authentication';
import { UnauthorizedError } from '../../../shared/errors';
import { Encrypter } from '../../protocols/cryptography/encrypter';
import { HashComparer } from '../../protocols/cryptography/hash-comparer';
import { LoadAccountByEmailRepository } from '../../protocols/account/load-account-by-email-repository';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth(data: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      data.email
    );

    if (!account) throw new UnauthorizedError('incorrect email or password');

    const passwordMatches = await this.hashComparer.compare(
      data.password,
      account.password
    );

    if (!passwordMatches)
      throw new UnauthorizedError('incorrect email or password');

    const accessToken = this.encrypter.encrypt({ id: account.id });

    const { id, password, ...accountData } = account;

    return {
      accessToken,
      account: accountData,
    };
  }
}
