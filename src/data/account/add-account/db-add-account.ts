import { AddAccount } from '../../../domain/use-cases/account/add-account';
import { UnprocessableEntityError } from '../../../shared/errors';
import { AddAccountRepository } from '../../protocols/add-account-repository';
import { Hasher } from '../../protocols/hasher';
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly addAccountRepository: AddAccountRepository
  ) {
    this.hasher = hasher;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.addAccountRepository = addAccountRepository;
  }
  async add(data: AddAccount.Params): Promise<void> {
    const { name, email, password } = data;
    const account = await this.loadAccountByEmailRepository.loadByEmail(email);
    if (account)
      throw new UnprocessableEntityError(
        'There is an account with this email already'
      );

    const hashedPassword = await this.hasher.hash(password);

    await this.addAccountRepository.add({
      name,
      email,
      password: hashedPassword,
    });
  }
}
