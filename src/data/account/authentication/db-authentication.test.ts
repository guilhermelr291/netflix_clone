import { describe, expect, test, vi } from 'vitest';
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository';
import { AccountModel } from '../../../domain/models/account';
import { DbAuthentication } from './db-authentication';
import { Authentication } from '../../../domain/use-cases/account/authentication';
import { UnauthorizedError } from '../../../shared/errors';
import { HashComparer } from '../../protocols/hash-comparer';

const mockAccount = (): AccountModel => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository
  {
    loadByEmail(email: string): Promise<AccountModel | null> {
      return new Promise(resolve => resolve(mockAccount()));
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    compare(): Promise<boolean> {
      return new Promise(resolve => resolve(true));
    }
  }

  return new HashComparerStub();
};

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hashComparerStub: HashComparer;
};

const mockAuthenticationParams = (): Authentication.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hashComparerStub = makeHashComparer();

  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub
  );

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
  };
};

describe('DbAuthentication', () => {
  describe('auth()', () => {
    test('should call LoadAccountByEmailRepository with correct value', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut();

      const loadByEmailSpy = vi.spyOn(
        loadAccountByEmailRepositoryStub,
        'loadByEmail'
      );

      const authParams = mockAuthenticationParams();

      await sut.auth(authParams);

      expect(loadByEmailSpy).toHaveBeenCalledWith(authParams.email);
    });
    test('should throw UnauthorizedError if LoadAccountByEmailRepository returns null', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut();

      vi.spyOn(
        loadAccountByEmailRepositoryStub,
        'loadByEmail'
      ).mockResolvedValueOnce(null);

      expect(sut.auth(mockAuthenticationParams())).rejects.toThrow(
        UnauthorizedError
      );
    });

    test('should call HashComparer with correct value', async () => {
      const { sut, hashComparerStub } = makeSut();

      const compareSpy = vi.spyOn(hashComparerStub, 'compare');

      const authParams = mockAuthenticationParams();

      await sut.auth(authParams);

      expect(compareSpy).toHaveBeenCalledWith(
        mockAccount().password,
        authParams.password
      );
    });
  });
});
