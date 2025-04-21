import { AddAccount } from '../../../domain/use-cases/add-account';
import { UnprocessableEntityError } from '../../../shared/errors';
import { Hasher } from '../../protocols/hasher';
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {
    this.hasher = hasher;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }
  async add(data: AddAccount.Params): Promise<void> {
    const { email, password } = data;
    const account = await this.loadAccountByEmailRepository.loadByEmail(email);
    if (account)
      throw new UnprocessableEntityError(
        'There is an account with this email already'
      );

    const hashedPassword = await this.hasher.hash(password);
  }
}
