import { LoadAccountByIdRepository } from '../../protocols/account/load-account-by-id-repository';

export class DbLoadAccountByToken {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}
}
