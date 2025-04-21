import { AddAccountRepository } from '../../../data/protocols/add-account-repository';
import { AddAccount } from '../../../domain/use-cases/add-account';
import prisma from '../../../../prisma/db';

export class AccountRepository implements AddAccountRepository {
  async add(data: AddAccount.Params): Promise<void> {
    await prisma.user.create({ data });
  }
}
