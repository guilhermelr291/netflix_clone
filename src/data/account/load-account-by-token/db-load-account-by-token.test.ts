import { describe, expect, test, vi } from 'vitest';
import { AccountModel } from '../../../domain/models/account';
import { LoadAccountByIdRepository } from '../../protocols/account/load-account-by-id-repository';
import { Decrypter } from '../../protocols/cryptography/decrypter';
import { DbLoadAccountByToken } from './db-load-account-by-token';

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt(): any {
      return { id: 1 };
    }
  }

  return new DecrypterStub();
};

const makeLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    loadById(id: number): Promise<AccountModel | null> {
      return new Promise(resolve => resolve(mockAccount()));
    }
  }

  return new LoadAccountByIdRepositoryStub();
};

type SutTypes = {
  sut: DbLoadAccountByToken;
  decrypterStub: Decrypter;
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository;
};

const mockAccount = (): AccountModel => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
});

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter();
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepository();

  const sut = new DbLoadAccountByToken(
    loadAccountByIdRepositoryStub,
    decrypterStub
  );

  return {
    sut,
    decrypterStub,
    loadAccountByIdRepositoryStub,
  };
};

describe('DbLoadAccountByToken', () => {
  describe('loadByToken()', () => {
    test('should call Decrypter with correct value', async () => {
      const { sut, decrypterStub } = makeSut();

      const decryptSpy = vi.spyOn(decrypterStub, 'decrypt');

      const token = 'any_token';
      await sut.loadByToken(token);

      expect(decryptSpy).toHaveBeenCalledWith(token);
    });
    test('should throw if Decrypter throws', async () => {
      const { sut, decrypterStub } = makeSut();

      vi.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.loadByToken('any_token')).rejects.toThrow();
    });
    test('should call LoadAccountByIdRepository with correct id', async () => {
      const { sut, loadAccountByIdRepositoryStub } = makeSut();

      const loadByIdSpy = vi.spyOn(loadAccountByIdRepositoryStub, 'loadById');

      await sut.loadByToken('any_token');

      expect(loadByIdSpy).toHaveBeenCalledWith(1);
    });
    test('should return null if LoadAccountByIdRepository returns null', async () => {
      const { sut, loadAccountByIdRepositoryStub } = makeSut();

      vi.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockResolvedValueOnce(
        null
      );

      const account = await sut.loadByToken('any_token');

      expect(account).toBeNull();
    });
    test('should throw if LoadAccountByIdRepository throws', async () => {
      const { sut, loadAccountByIdRepositoryStub } = makeSut();

      vi.spyOn(
        loadAccountByIdRepositoryStub,
        'loadById'
      ).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.loadByToken('any_token')).rejects.toThrow();
    });
    test('should return an account on success', async () => {
      const { sut } = makeSut();

      const account = await sut.loadByToken('any_token');

      expect(account).toEqual(mockAccount());
    });
  });
});
