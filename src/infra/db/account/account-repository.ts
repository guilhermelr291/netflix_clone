import { AddAccountRepository } from '../../../data/protocols/account/add-account-repository';
import { LoadAccountByEmailRepository } from '../../../data/protocols/account/load-account-by-email-repository';
import { AddAccount } from '../../../domain/use-cases/account/add-account';
import prisma from '../../../../prisma/db';
import { AccountModel } from '../../../domain/models/account';
import { LoadAccountByIdRepository } from '../../../data/protocols/account/load-account-by-id-repository';

export class AccountRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    LoadAccountByIdRepository
{
  async add(data: AddAccount.Params): Promise<void> {
    await prisma.user.create({ data });
  }
  async loadByEmail(email: string): Promise<AccountModel | null> {
    const account = await prisma.user.findUnique({ where: { email } });

    return account;
  }
  async loadById(id: number): Promise<AccountModel | null> {
    const account = await prisma.user.findUnique({ where: { id } });
  }
}
