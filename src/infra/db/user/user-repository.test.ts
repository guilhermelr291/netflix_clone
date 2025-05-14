import { vi, describe, test, expect } from 'vitest';
import { UserRepository } from './user-repository';
import { AddUser } from '../../../domain/use-cases/user/add-user';
import prisma from '../../../../prisma/db';
import { UserModel } from '../../../domain/models/user';
import { mockUser } from '../../../__tests__/factories/user/models-factory';
import { mockAddUserParams } from '../../../__tests__/factories/user/requested-params';

vi.mock('../../../../prisma/db', () => ({
  default: {
    user: {
      create: vi.fn(),
      findUnique: vi.fn().mockResolvedValue({
        id: 1,
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'USER',
      }),
    },
  },
}));

const makeSut = (): UserRepository => {
  const sut = new UserRepository();

  return sut;
};

describe('UserRepository', () => {
  describe('add()', () => {
    test('should call prisma with correct data', async () => {
      const sut = makeSut();

      const data = mockAddUserParams();
      await sut.add(data);

      expect(prisma.user.create).toHaveBeenCalledWith({ data });
    });
    test('should throw if prisma throws', async () => {
      const sut = makeSut();

      vi.mocked(prisma.user.create).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.add(mockAddUserParams())).rejects.toThrow();
    });
  });
  describe('loadByEmail()', () => {
    test('should call prisma with correct data', async () => {
      const sut = makeSut();

      const { email } = mockAddUserParams();
      await sut.loadByEmail(email);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });
    test('should throw if prisma throws', async () => {
      const sut = makeSut();

      vi.mocked(prisma.user.findUnique).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.loadByEmail(mockAddUserParams().email)).rejects.toThrow();
    });
    test('should return correct data on success', async () => {
      const sut = makeSut();

      const { email } = mockAddUserParams();
      const result = await sut.loadByEmail(email);

      expect(result).toEqual(mockUser());
    });
  });
  describe('loadById()', () => {
    test('should call prisma.user.findUnique with correct value', async () => {
      const sut = makeSut();
      const findUniqueSpy = vi.mocked(prisma.user.findUnique);

      await sut.loadById(1);

      expect(findUniqueSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    test('should return correct data on success', async () => {
      const sut = makeSut();

      const result = await sut.loadById(1);

      expect(result).toEqual(mockUser());
    });
    test('should throw if prisma  throws', async () => {
      const sut = makeSut();
      vi.mocked(prisma.user.findUnique).mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.loadById(1)).rejects.toThrow();
    });
    test('should return null if user is found but has a different role', async () => {
      const sut = makeSut();
      const result = await sut.loadById(1, 'ADMIN');
      expect(result).toBeNull();
    });
  });
});
