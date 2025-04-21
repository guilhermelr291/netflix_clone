import { AccountModel } from '../../domain/use-cases/models/account';

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel | null>;
}
