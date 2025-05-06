import { vi, describe, test, expect } from 'vitest';
import { AccountRepository } from './account-repository';
import { AddAccount } from '../../../domain/use-cases/account/add-account';
import prisma from '../../../../prisma/db';
import { AccountModel } from '../../../domain/models/account';

vi.mock('../../../../prisma/db', () => ({
  default: {
    user: {
      create: vi.fn(),
      findUnique: vi.fn().mockResolvedValue({
        id: 1,
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      }),
    },
  },
}));

const mockAddAccountParams = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

const mockAccount = (): AccountModel => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeSut = (): AccountRepository => {
  const sut = new AccountRepository();

  return sut;
};

describe('AccountRepository', () => {
  describe('add()', () => {
    test('should call prisma with correct data', async () => {
      const sut = makeSut();

      const data = mockAddAccountParams();
      await sut.add(data);

      expect(prisma.user.create).toHaveBeenCalledWith({ data });
    });
    test('should throw if prisma throws', async () => {
      const sut = makeSut();

      vi.mocked(prisma.user.create).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.add(mockAddAccountParams())).rejects.toThrow();
    });
  });
  describe('loadByEmail()', () => {
    test('should call prisma with correct data', async () => {
      const sut = makeSut();

      const { email } = mockAddAccountParams();
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

      expect(sut.loadByEmail(mockAddAccountParams().email)).rejects.toThrow();
    });
    test('should return correct data', async () => {
      const sut = makeSut();

      const { email } = mockAddAccountParams();
      const result = await sut.loadByEmail(email);

      expect(result).toEqual(mockAccount());
    });
  });
});
