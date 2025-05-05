import { AddAccount } from '../../../domain/use-cases/account/add-account';

export interface AddAccountRepository {
  add(data: AddAccount.Params): Promise<void>;
}
