import { AddAccountRepository } from '../../../data/protocols/add-account-repository';
import { LoadAccountByEmailRepository } from '../../../data/protocols/load-account-by-email-repository';
import { AddAccount } from '../../../domain/use-cases/add-account';
import prisma from '../../../../prisma/db';
import { AccountModel } from '../../../domain/use-cases/models/account';

export class AccountRepository
  implements AddAccountRepository, LoadAccountByEmailRepository
{
  async add(data: AddAccount.Params): Promise<void> {
    await prisma.user.create({ data });
  }
  async loadByEmail(email: string): Promise<AccountModel | null> {
    const account = await prisma.user.findUnique({ where: { email } });

    return account;
  }
}
