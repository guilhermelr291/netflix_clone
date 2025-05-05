import { LoadAccountByIdRepository } from '../../protocols/account/load-account-by-id-repository';
import { Decrypter } from '../../protocols/cryptography/descrypter';

export class DbLoadAccountByToken {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly decrypter: Decrypter
  ) {}
}
