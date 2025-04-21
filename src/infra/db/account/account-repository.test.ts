import { vi, describe, test, expect } from 'vitest';
import { AccountRepository } from './account-repository';
import { AddAccount } from '../../../domain/use-cases/add-account';
import prisma from '../../../../prisma/db';

vi.mock('../../../../prisma/db', () => ({
  default: {
    user: {
      create: vi.fn(),
    },
  },
}));

const mockAddAccountParams = (): AddAccount.Params => ({
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
});
