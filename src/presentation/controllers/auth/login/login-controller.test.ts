import { vi, test, describe, expect } from 'vitest';
import { LoginController } from './login-controller';
import { Authentication } from '../../../../domain/use-cases/user/authentication';
import { mockAuthenticationResult } from '../../../../__tests__/factories/user/models-factory';
import { makeAuthentication } from '../../../../__tests__/factories/user/domain-factory';
import { mockAuthenticationParams } from '../../../../__tests__/factories/user/request-params';

type sutTypes = {
  sut: LoginController;
  authenticationStub: Authentication;
};

const makeSut = (): sutTypes => {
  const authenticationStub = makeAuthentication();
  const sut = new LoginController(authenticationStub);

  return { sut, authenticationStub };
};

describe('LoginController', () => {
  test('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();

    const authSpy = vi.spyOn(authenticationStub, 'auth');

    const requestData = mockAuthenticationParams();

    await sut.handle(requestData);

    expect(authSpy).toHaveBeenCalledWith(requestData);
  });
  test('should throw if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();

    vi.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.handle(mockAuthenticationParams())).rejects.toThrow();
  });
  test('should return correct values on success', async () => {
    const { sut } = makeSut();

    const result = await sut.handle(mockAuthenticationParams());

    expect(result).toEqual({ status: 200, body: mockAuthenticationResult() });
  });
});
