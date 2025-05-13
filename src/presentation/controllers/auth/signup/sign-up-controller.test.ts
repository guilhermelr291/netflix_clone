import { vi, test, describe, expect } from 'vitest';
import { SignUpController } from './sign-up-controller';
import { AddUser } from '../../../../domain/use-cases/user/add-user';
import { FieldComparer } from '../../../protocols/field-comparer';
import { BadRequestError } from '../../../../shared/errors';
import { created } from '../../../helpers/http-helper';
import { makeAddUser } from '../../../../__tests__/factories/user/domain-factory';
import { mockSignUpRequestParams } from '../../../../__tests__/factories/user/request-params';

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
  addUserStub: AddUser;
  fieldComparerStub: FieldComparer;
};
const makeSut = (): SutTypes => {
  const addUserStub = makeAddUser();
  const fieldComparerStub = makeFieldComparer();

  const sut = new SignUpController(addUserStub, fieldComparerStub);

  return { sut, addUserStub, fieldComparerStub };
};

describe('SignUpController', () => {
  test('should call FieldComparer with correct values', async () => {
    const { sut, fieldComparerStub } = makeSut();

    const compareSpy = vi.spyOn(fieldComparerStub, 'compare');

    const request = mockSignUpRequestParams();

    await sut.handle(request);

    expect(compareSpy).toHaveBeenCalledWith(request);
  });
  test('should throw BadRequestError if FieldComparer returns false', async () => {
    const { sut, fieldComparerStub } = makeSut();

    vi.spyOn(fieldComparerStub, 'compare').mockReturnValueOnce(false);

    await expect(sut.handle(mockSignUpRequestParams())).rejects.toThrow(
      BadRequestError
    );
  });

  test('should call AddUser with correct values', async () => {
    const { sut, addUserStub } = makeSut();

    const addSpy = vi.spyOn(addUserStub, 'add');

    const request = mockSignUpRequestParams();

    await sut.handle(request);

    const { name, email, password } = request;

    expect(addSpy).toHaveBeenCalledWith({ name, email, password });
  });

  test('should throw if AddUser throws', async () => {
    const { sut, addUserStub } = makeSut();

    vi.spyOn(addUserStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.handle(mockSignUpRequestParams())).rejects.toThrow();
  });
  test('should return status 201 and success message on success', async () => {
    const { sut } = makeSut();

    const result = await sut.handle(mockSignUpRequestParams());

    expect(result).toEqual(created({ message: 'User created successfully!' }));
  });
});
