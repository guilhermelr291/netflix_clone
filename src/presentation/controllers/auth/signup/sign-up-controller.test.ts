import { vi, test, describe, expect } from 'vitest';
import { SignUpController } from './sign-up-controller';
import { AddAccount } from '../../../../domain/use-cases/add-account';
import { FieldComparer } from '../../../protocols/field-comparer';
import { badRequestError } from '../../../../shared/errors';

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
      badRequestError
    );
  });
});
