import { describe, expect, test, vi } from 'vitest';
import { Hasher } from '../../protocols/cryptography/hasher';
import { DbAddAccount } from './db-add-account';
import { AddAccount } from '../../../domain/use-cases/account/add-account';
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository';
import { AccountModel } from '../../../domain/models/account';
import { UnprocessableEntityError } from '../../../shared/errors';
import { AddAccountRepository } from '../../protocols/add-account-repository';

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    hash(): Promise<string> {
      return new Promise(resolve => resolve('hashed_value'));
    }
  }

  return new HasherStub();
};
const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository
  {
    loadByEmail(email: string): Promise<AccountModel | null> {
      return new Promise(resolve => resolve(null));
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};
const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(data: AddAccount.Params): Promise<void> {}
  }

  return new AddAccountRepositoryStub();
};

type SutTypes = {
  sut: DbAddAccount;
  hasherStub: Hasher;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  addAccountRepositoryStub: AddAccountRepository;
};

const mockAddAccountParams = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

const mockAccount = (): AccountModel => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher();
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const addAccountRepositoryStub = makeAddAccountRepository();

  const sut = new DbAddAccount(
    hasherStub,
    loadAccountByEmailRepositoryStub,
    addAccountRepositoryStub
  );

  return {
    sut,
    hasherStub,
    loadAccountByEmailRepositoryStub,
    addAccountRepositoryStub,
  };
};

describe('DbAddAccount', () => {
  describe('add()', () => {
    test('should call Hasher with correct value', async () => {
      const { sut, hasherStub } = makeSut();

      const hashSpy = vi.spyOn(hasherStub, 'hash');

      const data = mockAddAccountParams();
      await sut.add(data);

      expect(hashSpy).toHaveBeenCalledWith(data.password);
    });
    test('should call LoadAccountByEmailRepository with correct value', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut();

      const loadByEmailSpy = vi.spyOn(
        loadAccountByEmailRepositoryStub,
        'loadByEmail'
      );

      const data = mockAddAccountParams();
      await sut.add(data);

      expect(loadByEmailSpy).toHaveBeenCalledWith(data.email);
    });
    test('should throw UnprocessableEntityError if there is an account with provided email', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut();

      vi.spyOn(
        loadAccountByEmailRepositoryStub,
        'loadByEmail'
      ).mockResolvedValueOnce(mockAccount());

      expect(sut.add(mockAddAccountParams())).rejects.toThrow(
        UnprocessableEntityError
      );
    });

    test('should call AddAccountRepository with correct values', async () => {
      const { sut, addAccountRepositoryStub } = makeSut();

      const addSpy = vi.spyOn(addAccountRepositoryStub, 'add');

      const data = mockAddAccountParams();

      const { name, email } = data;

      await sut.add(data);

      expect(addSpy).toHaveBeenCalledWith({
        name,
        email,
        password: 'hashed_value',
      });
    });
    test('should throw if LoadAccountByEmailRepository throws', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut();

      vi.spyOn(
        loadAccountByEmailRepositoryStub,
        'loadByEmail'
      ).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.add(mockAddAccountParams())).rejects.toThrow();
    });
    test('should throw if Hasher throws', async () => {
      const { sut, hasherStub } = makeSut();

      vi.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.add(mockAddAccountParams())).rejects.toThrow();
    });
    test('should throw if AddAccountRepository throws', async () => {
      const { sut, addAccountRepositoryStub } = makeSut();

      vi.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.add(mockAddAccountParams())).rejects.toThrow();
    });
  });
});
