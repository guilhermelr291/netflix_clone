import { vi, describe, test, expect } from 'vitest';
import { CheckAuth } from './check-auth-middleware';
import { LoadUserByToken } from '../../domain/use-cases/user/load-user-by-token';
import { UserModel } from '../../domain/models/user';
import { UnauthorizedError } from '../../shared/errors';
import { ok } from '../helpers/http-helper';

const mockUser = (): UserModel => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  role: 'USER',
});

const makeLoadUserByToken = (): LoadUserByToken => {
  class LoadUserByTokenStub implements LoadUserByToken {
    loadByToken(token: string): Promise<UserModel | null> {
      return new Promise(resolve => resolve(mockUser()));
    }
  }
  return new LoadUserByTokenStub();
};

const mockRequest = (): CheckAuth.Params => ({
  headers: {
    authorization: 'bearer any_token',
  },
});

type SutTypes = {
  sut: CheckAuth;
  loadUserByTokenStub: LoadUserByToken;
};

const DEFAULT_ROLE = 'USER_ROLE';
const makeSut = (): SutTypes => {
  const loadUserByTokenStub = makeLoadUserByToken();
  const sut = new CheckAuth(loadUserByTokenStub, DEFAULT_ROLE);

  return { sut, loadUserByTokenStub };
};

describe('CheckAuth', () => {
  test('should call LoadUserByToken with correct values', async () => {
    const { sut, loadUserByTokenStub } = makeSut();

    const loadByTokenSpy = vi.spyOn(loadUserByTokenStub, 'loadByToken');

    const requestData = mockRequest();

    await sut.handle(requestData);

    expect(loadByTokenSpy).toHaveBeenCalledWith(
      requestData.headers.authorization.split(' ')[1],
      DEFAULT_ROLE
    );
  });
  test('should throw UnauthorizedError if LoadUserByToken throws', async () => {
    const { sut, loadUserByTokenStub } = makeSut();

    vi.spyOn(loadUserByTokenStub, 'loadByToken').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.handle(mockRequest())).rejects.toThrow(UnauthorizedError);
  });
  test('should throw UnauthorizedError if token is not provided', async () => {
    const { sut } = makeSut();

    expect(
      sut.handle({
        headers: {
          authorization: '',
        },
      })
    ).rejects.toThrow(UnauthorizedError);
  });
  test('should throw UnauthorizedError if LoadUserByToken returns null', async () => {
    const { sut, loadUserByTokenStub } = makeSut();

    vi.spyOn(loadUserByTokenStub, 'loadByToken').mockResolvedValueOnce(null);

    expect(sut.handle(mockRequest())).rejects.toThrow(UnauthorizedError);
  });
  test('should return correct status and userId on success', async () => {
    const { sut } = makeSut();

    const result = await sut.handle(mockRequest());

    expect(result).toEqual(ok({ userId: mockUser().id }));
  });
});
