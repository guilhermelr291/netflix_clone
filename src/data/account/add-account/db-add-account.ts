import { AddAccount } from '../../../domain/use-cases/add-account';
import { Hasher } from '../../protocols/hasher';

export class DbAddAccount implements AddAccount {
  constructor(private readonly hasher: Hasher) {
    this.hasher = hasher;
  }
  async add(data: AddAccount.Params): Promise<void> {
    const hashedPassword = await this.hasher.hash(data.password);
  }
}
