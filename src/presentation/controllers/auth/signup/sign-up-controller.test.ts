import { vi, test, describe, expect } from 'vitest';
import { SignUpController } from './sign-up-controller';
import { AddAccount } from '../../../../domain/use-cases/add-account';
import { FieldComparer } from '../../../protocols/field-comparer';
import { badRequestError } from '../../../../shared/errors';
import { EmailValidator } from '../../../../domain/protocols/email-validator';

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
const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

type SutTypes = {
  sut: SignUpController;
  addAccountStub: AddAccount;
  fieldComparerStub: FieldComparer;
  emailValidatorStub: EmailValidator;
};
const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount();
  const fieldComparerStub = makeFieldComparer();
  const emailValidatorStub = makeEmailValidator();
  const sut = new SignUpController(
    addAccountStub,
    fieldComparerStub,
    emailValidatorStub
  );

  return { sut, addAccountStub, fieldComparerStub, emailValidatorStub };
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

  test('should call EmailValidator with correct values', async () => {
    const { sut, emailValidatorStub } = makeSut();

    const compareSpy = vi.spyOn(emailValidatorStub, 'isValid');

    const request = mockRequestParams();

    await sut.handle(request);

    expect(compareSpy).toHaveBeenCalledWith(request.email);
  });
  test('should throw BadRequestError if EmailValidator returns false', async () => {
    const { sut, emailValidatorStub } = makeSut();

    vi.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    await expect(sut.handle(mockRequestParams())).rejects.toThrow(
      badRequestError
    );
  });
});
