import { vi, test, describe, expect } from 'vitest';
import { SignUpController } from './sign-up-controller';
import { AddAccount } from '../../../../domain/use-cases/account/add-account';
import { FieldComparer } from '../../../protocols/field-comparer';
import { BadRequestError } from '../../../../shared/errors';

import { created } from '../../../helpers/http-helper';

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(data: AddAccount.Params): Promise<void> {}
  }

  return new AddAccountStub();
};

const makeFieldComparer = (): FieldComparer => {
  class FieldComparerStub implements FieldComparer {
    field: string = 'any_field';
    fieldToCompare: string = 'another_field';
    compare(data: any): boolean {
      return true;
    }
  }

  return new FieldComparerStub();
};

type SutTypes = {
  sut: SignUpController;
  addAccountStub: AddAccount;
  fieldComparerStub: FieldComparer;
};
const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount();
  const fieldComparerStub = makeFieldComparer();

  const sut = new SignUpController(addAccountStub, fieldComparerStub);

  return { sut, addAccountStub, fieldComparerStub };
};

const mockRequestParams = () => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password',
});

describe('SignUpController', () => {
  test('should call FieldComparer with correct values', async () => {
    const { sut, fieldComparerStub } = makeSut();

    const compareSpy = vi.spyOn(fieldComparerStub, 'compare');

    const request = mockRequestParams();

    await sut.handle(request);

    expect(compareSpy).toHaveBeenCalledWith(request);
  });
  test('should throw BadRequestError if FieldComparer returns false', async () => {
    const { sut, fieldComparerStub } = makeSut();

    vi.spyOn(fieldComparerStub, 'compare').mockReturnValueOnce(false);

    await expect(sut.handle(mockRequestParams())).rejects.toThrow(
      BadRequestError
    );
  });

  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();

    const addSpy = vi.spyOn(addAccountStub, 'add');

    const request = mockRequestParams();

    await sut.handle(request);

    const { name, email, password } = request;

    expect(addSpy).toHaveBeenCalledWith({ name, email, password });
  });

  test('should throw if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();

    vi.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.handle(mockRequestParams())).rejects.toThrow();
  });
  test('should return status 201 and success message on success', async () => {
    const { sut } = makeSut();

    const result = await sut.handle(mockRequestParams());

    expect(result).toEqual(
      created({ message: 'Account created successfully!' })
    );
  });
});
