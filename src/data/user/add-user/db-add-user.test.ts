import { describe, expect, test, vi } from 'vitest';
import { Hasher } from '../../protocols/cryptography/hasher';
import { DbAddUser } from './db-add-user';
import { LoadUserByEmailRepository } from '../../protocols/user/load-user-by-email-repository';
import { UnprocessableEntityError } from '../../../shared/errors';
import { AddUserRepository } from '../../protocols/user/add-user-repository';
import { mockUser } from '../../../__tests__/factories/user/models-factory';
import { makeAddUserRepository } from '../../../__tests__/factories/user/infra-factory';
import { mockAddUserParams } from '../../../__tests__/factories/user/request-params';
import { UserModel } from '../../../domain/models/user';

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    hash(): Promise<string> {
      return new Promise(resolve => resolve('hashed_value'));
    }
  }

  return new HasherStub();
};

const makeLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    loadByEmail(email: string): Promise<UserModel | null> {
      return new Promise(resolve => resolve(null));
    }
  }

  return new LoadUserByEmailRepositoryStub();
};

type SutTypes = {
  sut: DbAddUser;
  hasherStub: Hasher;
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository;
  addUserRepositoryStub: AddUserRepository;
};

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher();
  const loadUserByEmailRepositoryStub = makeLoadUserByEmailRepository();
  const addUserRepositoryStub = makeAddUserRepository();

  const sut = new DbAddUser(
    hasherStub,
    loadUserByEmailRepositoryStub,
    addUserRepositoryStub
  );

  return {
    sut,
    hasherStub,
    loadUserByEmailRepositoryStub: loadUserByEmailRepositoryStub,
    addUserRepositoryStub: addUserRepositoryStub,
  };
};

describe('DbAddUser', () => {
  describe('add()', () => {
    test('should call Hasher with correct value', async () => {
      const { sut, hasherStub } = makeSut();

      const hashSpy = vi.spyOn(hasherStub, 'hash');

      const data = mockAddUserParams();
      await sut.add(data);

      expect(hashSpy).toHaveBeenCalledWith(data.password);
    });
    test('should call LoadUserByEmailRepository with correct value', async () => {
      const { sut, loadUserByEmailRepositoryStub } = makeSut();

      const loadByEmailSpy = vi.spyOn(
        loadUserByEmailRepositoryStub,
        'loadByEmail'
      );

      const data = mockAddUserParams();
      await sut.add(data);

      expect(loadByEmailSpy).toHaveBeenCalledWith(data.email);
    });
    test('should throw UnprocessableEntityError if there is an user with provided email', async () => {
      const { sut, loadUserByEmailRepositoryStub } = makeSut();

      vi.spyOn(
        loadUserByEmailRepositoryStub,
        'loadByEmail'
      ).mockResolvedValueOnce(mockUser());

      expect(sut.add(mockAddUserParams())).rejects.toThrow(
        UnprocessableEntityError
      );
    });

    test('should call AddUserRepository with correct values', async () => {
      const { sut, addUserRepositoryStub } = makeSut();

      const addSpy = vi.spyOn(addUserRepositoryStub, 'add');

      const data = mockAddUserParams();

      const { name, email } = data;

      await sut.add(data);

      expect(addSpy).toHaveBeenCalledWith({
        name,
        email,
        password: 'hashed_value',
      });
    });
    test('should throw if LoadUserByEmailRepository throws', async () => {
      const { sut, loadUserByEmailRepositoryStub } = makeSut();

      vi.spyOn(
        loadUserByEmailRepositoryStub,
        'loadByEmail'
      ).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.add(mockAddUserParams())).rejects.toThrow();
    });
    test('should throw if Hasher throws', async () => {
      const { sut, hasherStub } = makeSut();

      vi.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.add(mockAddUserParams())).rejects.toThrow();
    });
    test('should throw if AddUserRepository throws', async () => {
      const { sut, addUserRepositoryStub } = makeSut();

      vi.spyOn(addUserRepositoryStub, 'add').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.add(mockAddUserParams())).rejects.toThrow();
    });
  });
});
