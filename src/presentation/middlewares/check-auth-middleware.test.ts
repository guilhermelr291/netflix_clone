import { vi, describe, test, expect } from 'vitest';
import { CheckAuth } from './check-auth-middleware';
import { LoadAccountByToken } from '../../domain/use-cases/account/load-account-by-token';
import { AccountModel } from '../../domain/models/account';

const mockAccount = (): AccountModel => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    loadByToken(token: string): Promise<AccountModel | null> {
      return new Promise(resolve => resolve(mockAccount()));
    }
  }
  return new LoadAccountByTokenStub();
};

const mockRequest = (): CheckAuth.Params => ({
  headers: {
    authorization: 'bearer any_token',
  },
});

type SutTypes = {
  sut: CheckAuth;
  loadAccountByTokenStub: LoadAccountByToken;
};

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken();
  const sut = new CheckAuth(loadAccountByTokenStub);

  return { sut, loadAccountByTokenStub };
};

describe('CheckAuth', () => {
  test('should call LoadAccountByToken with correct values', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();

    const loadByTokenSpy = vi.spyOn(loadAccountByTokenStub, 'loadByToken');

    const requestData = mockRequest();

    await sut.handle(requestData);

    expect(loadByTokenSpy).toHaveBeenCalledWith(
      requestData.headers.authorization.split(' ')[1]
    );
  });
});
