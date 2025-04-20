import { describe, expect, test, vi } from 'vitest';
import { Hasher } from '../../protocols/hasher';
import { DbAddAccount } from './db-add-account';
import { AddAccount } from '../../../domain/use-cases/add-account';
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository';
import { AccountModel } from '../../../domain/use-cases/models/account';

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
    loadByEmail(email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccount()));
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

type SutTypes = {
  sut: DbAddAccount;
  hasherStub: Hasher;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
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

  const sut = new DbAddAccount(hasherStub, loadAccountByEmailRepositoryStub);

  return { sut, hasherStub, loadAccountByEmailRepositoryStub };
};

describe('add()', () => {
  test('ensure DbAddAccount calls Hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut();

    const hashSpy = vi.spyOn(hasherStub, 'hash');

    const data = mockAddAccountParams();
    await sut.add(data);

    expect(hashSpy).toHaveBeenCalledWith(data.password);
  });
  test('ensure DbAddAccount calls LoadAccountByEmailRepository with correct value', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    const loadByEmailSpy = vi.spyOn(
      loadAccountByEmailRepositoryStub,
      'loadByEmail'
    );

    const data = mockAddAccountParams();
    await sut.add(data);

    expect(loadByEmailSpy).toHaveBeenCalledWith(data.email);
  });
});
