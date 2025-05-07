import { Authentication } from '../../../domain/use-cases/user/authentication';
import { UnauthorizedError } from '../../../shared/errors';
import { Encrypter } from '../../protocols/cryptography/encrypter';
import { HashComparer } from '../../protocols/cryptography/hash-comparer';
import { LoadUserByEmailRepository } from '../../protocols/user/load-user-by-email-repository';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth(data: Authentication.Params): Promise<Authentication.Result> {
    const user = await this.loadUserByEmailRepository.loadByEmail(data.email);

    if (!user) throw new UnauthorizedError('incorrect email or password');

    const passwordMatches = await this.hashComparer.compare(
      data.password,
      user.password
    );

    if (!passwordMatches)
      throw new UnauthorizedError('incorrect email or password');

    const accessToken = this.encrypter.encrypt({ id: user.id });

    const { id, password, ...userData } = user;

    return {
      accessToken,
      user: userData,
    };
  }
}
