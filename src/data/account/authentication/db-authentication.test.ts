import { describe, expect, test, vi } from 'vitest';
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository';
import { AccountModel } from '../../../domain/models/account';
import { DbAuthentication } from './db-authentication';
import { Authentication } from '../../../domain/use-cases/account/authentication';
import { UnauthorizedError } from '../../../shared/errors';
import { HashComparer } from '../../protocols/cryptography/hash-comparer';
import { Encrypter } from '../../protocols/cryptography/encrypter';

const mockAccount = (): AccountModel => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository
  {
    loadByEmail(email: string): Promise<AccountModel | null> {
      return new Promise(resolve => resolve(mockAccount()));
    }
  }

  return new LoadAccountByEmailRepositoryStub();
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
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hashComparerStub: HashComparer;
  encrypterStub: Encrypter;
};

const mockAuthenticationParams = (): Authentication.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hashComparerStub = makeHashComparer();
  const encrypterStub = makeEncrypter();

  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub
  );

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
  };
};

describe('DbAuthentication', () => {
  describe('auth()', () => {
    test('should call LoadAccountByEmailRepository with correct value', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut();

      const loadByEmailSpy = vi.spyOn(
        loadAccountByEmailRepositoryStub,
        'loadByEmail'
      );

      const authParams = mockAuthenticationParams();

      await sut.auth(authParams);

      expect(loadByEmailSpy).toHaveBeenCalledWith(authParams.email);
    });
    test('should throw UnauthorizedError if LoadAccountByEmailRepository returns null', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut();

      vi.spyOn(
        loadAccountByEmailRepositoryStub,
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
        mockAccount().password,
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

      expect(encryptSpy).toHaveBeenCalledWith(mockAccount().id);
    });

    test('should throw if Encrypter throws', async () => {
      const { sut, encrypterStub } = makeSut();

      vi.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.auth(mockAuthenticationParams())).rejects.toThrow();
    });
    test('should throw if LoadAccountByEmailRepository throws', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut();

      vi.spyOn(
        loadAccountByEmailRepositoryStub,
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

      const account = mockAccount();
      const { id, password, ...accountData } = account;

      expect(result).toEqual({
        accessToken: 'encrypted_value',
        account: accountData,
      });
    });
  });
});
