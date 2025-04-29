import { vi, test, describe, expect } from 'vitest';
import { LoginController } from './login-controller';
import { Authentication } from '../../../../domain/use-cases/account/authentication';

const mockAuthenticationResult = (): Authentication.Result => ({
  accessToken: 'any_token',
  account: {
    name: 'any_name',
    email: 'any_email',
  },
});

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    auth(data: Authentication.Params): Promise<Authentication.Result> {
      return new Promise(resolve => resolve(mockAuthenticationResult()));
    }
  }

  return new AuthenticationStub();
};

type sutTypes = {
  sut: LoginController;
  authenticationStub: Authentication;
};

const mockRequestData = (): Authentication.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeSut = (): sutTypes => {
  const authenticationStub = makeAuthentication();
  const sut = new LoginController(authenticationStub);

  return { sut, authenticationStub };
};

describe('LoginController', () => {
  test('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();

    const authSpy = vi.spyOn(authenticationStub, 'auth');

    const requestData = mockRequestData();

    await sut.handle(requestData);

    expect(authSpy).toHaveBeenCalledWith(requestData);
  });
});
