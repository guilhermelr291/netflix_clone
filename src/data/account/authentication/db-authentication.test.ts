import { describe, expect, test, vi } from 'vitest';
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository';
import { AccountModel } from '../../../domain/models/account';
import { DbAuthentication } from './db-authentication';
import { Authentication } from '../../../domain/use-cases/account/authentication';

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

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
};

const mockAuthenticationParams = (): Authentication.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();

  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);

  return {
    sut,
    loadAccountByEmailRepositoryStub,
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
  });
});
