import { AddAccount } from '../../domain/use-cases/add-account';

export interface AddAccountRepository {
  add(data: AddAccount.Params): Promise<void>;
}
