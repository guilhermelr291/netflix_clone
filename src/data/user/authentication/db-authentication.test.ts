import { describe, expect, test, vi } from 'vitest';
import { UserModel } from '../../../domain/models/user';
import { DbAuthentication } from './db-authentication';
import { Authentication } from '../../../domain/use-cases/user/authentication';
import { UnauthorizedError } from '../../../shared/errors';
import { HashComparer } from '../../protocols/cryptography/hash-comparer';
import { Encrypter } from '../../protocols/cryptography/encrypter';
import { LoadUserByEmailRepository } from '../../protocols/user/load-user-by-email-repository';

const mockUser = (): UserModel => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  role: 'USER',
});

const makeLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    loadByEmail(email: string): Promise<UserModel | null> {
      return new Promise(resolve => resolve(mockUser()));
    }
  }

  return new LoadUserByEmailRepositoryStub();
};

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    compare(valueToCompare: string, hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true));
    }
  }

  return new HashComparerStub();
};
const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    encrypt(value: string | number): string {
      return 'encrypted_value';
    }
  }

  return new EncrypterStub();
};

type SutTypes = {
  sut: DbAuthentication;
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository;
  hashComparerStub: HashComparer;
  encrypterStub: Encrypter;
};

const mockAuthenticationParams = (): Authentication.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = makeLoadUserByEmailRepository();
  const hashComparerStub = makeHashComparer();
  const encrypterStub = makeEncrypter();

  const sut = new DbAuthentication(
    loadUserByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub
  );

  return {
    sut,
    loadUserByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
  };
};

describe('DbAuthentication', () => {
  describe('auth()', () => {
    test('should call LoadUserByEmailRepository with correct value', async () => {
      const {
        sut,
        loadUserByEmailRepositoryStub: loadUserByEmailRepositoryStub,
      } = makeSut();

      const loadByEmailSpy = vi.spyOn(
        loadUserByEmailRepositoryStub,
        'loadByEmail'
      );

      const authParams = mockAuthenticationParams();

      await sut.auth(authParams);

      expect(loadByEmailSpy).toHaveBeenCalledWith(authParams.email);
    });
    test('should throw UnauthorizedError if LoadUserByEmailRepository returns null', async () => {
      const {
        sut,
        loadUserByEmailRepositoryStub: loadUserByEmailRepositoryStub,
      } = makeSut();

      vi.spyOn(
        loadUserByEmailRepositoryStub,
        'loadByEmail'
      ).mockResolvedValueOnce(null);

      expect(sut.auth(mockAuthenticationParams())).rejects.toThrow(
        UnauthorizedError
      );
    });

    test('should call HashComparer with correct value', async () => {
      const { sut, hashComparerStub } = makeSut();

      const compareSpy = vi.spyOn(hashComparerStub, 'compare');

      const authParams = mockAuthenticationParams();

      await sut.auth(authParams);

      expect(compareSpy).toHaveBeenCalledWith(
        mockUser().password,
        authParams.password
      );
    });

    test('should throw UnauthorizedError if HashComparer returns false', async () => {
      const { sut, hashComparerStub } = makeSut();

      vi.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false);

      expect(sut.auth(mockAuthenticationParams())).rejects.toThrow(
        UnauthorizedError
      );
    });

    test('should call Encrypter with correct value', async () => {
      const { sut, encrypterStub } = makeSut();

      const encryptSpy = vi.spyOn(encrypterStub, 'encrypt');

      await sut.auth(mockAuthenticationParams());

      expect(encryptSpy).toHaveBeenCalledWith({ id: mockUser().id });
    });

    test('should throw if Encrypter throws', async () => {
      const { sut, encrypterStub } = makeSut();

      vi.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.auth(mockAuthenticationParams())).rejects.toThrow();
    });
    test('should throw if LoadUserByEmailRepository throws', async () => {
      const {
        sut,
        loadUserByEmailRepositoryStub: loadUserByEmailRepositoryStub,
      } = makeSut();

      vi.spyOn(
        loadUserByEmailRepositoryStub,
        'loadByEmail'
      ).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.auth(mockAuthenticationParams())).rejects.toThrow();
    });
    test('should throw if HashComparer throws', async () => {
      const { sut, hashComparerStub } = makeSut();

      vi.spyOn(hashComparerStub, 'compare').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.auth(mockAuthenticationParams())).rejects.toThrow();
    });
    test('should return correct data on success', async () => {
      const { sut } = makeSut();

      const result = await sut.auth(mockAuthenticationParams());

      const user = mockUser();
      const { id, password, ...userData } = user;

      expect(result).toEqual({
        accessToken: 'encrypted_value',
        user: userData,
      });
    });
  });
});
