import { AddAccountRepository } from '../../../data/protocols/add-account-repository';
import { AddAccount } from '../../../domain/use-cases/add-account';

export class AccountRepository implements AddAccountRepository {
  async add(data: AddAccount.Params): Promise<void> {}
}
