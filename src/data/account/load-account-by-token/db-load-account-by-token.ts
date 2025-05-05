import { AccountModel } from '../../../domain/models/account';
import { LoadAccountByToken } from '../../../domain/use-cases/account/load-account-by-token';
import { LoadAccountByIdRepository } from '../../protocols/account/load-account-by-id-repository';
import { Decrypter } from '../../protocols/cryptography/decrypter';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly decrypter: Decrypter
  ) {}

  async loadByToken(token: string): Promise<AccountModel | null> {
    const payload = await this.decrypter.decrypt(token);

    const id = Number(payload.id);

    const account = await this.loadAccountByIdRepository.loadById(id);

    return account;
  }
}
