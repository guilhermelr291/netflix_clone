import { AddUserRepository } from '../../../data/protocols/user/add-user-repository';
import { LoadUserByEmailRepository } from '../../../data/protocols/user/load-user-by-email-repository';
import { AddUser } from '../../../domain/use-cases/user/add-user';
import prisma from '../../../../prisma/db';
import { UserModel } from '../../../domain/models/user';
import { LoadUserByIdRepository } from '../../../data/protocols/user/load-user-by-id-repository';
import { UserRole } from '../../../../generated/prisma';

export class UserRepository
  implements
    AddUserRepository,
    LoadUserByEmailRepository,
    LoadUserByIdRepository
{
  async add(data: AddUser.Params): Promise<void> {
    await prisma.user.create({ data });
  }
  async loadByEmail(email: string): Promise<UserModel | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }
  async loadById(id: number, role?: string): Promise<UserModel | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user && role && user.role !== role) {
      return null;
    }

    return user;
  }
}
