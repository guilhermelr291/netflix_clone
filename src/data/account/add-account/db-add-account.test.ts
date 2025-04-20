import { describe, expect, test, vi } from 'vitest';
import { Hasher } from '../../protocols/hasher';
import { DbAddAccount } from './db-add-account';
import { AddAccount } from '../../../domain/use-cases/add-account';

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    hash(): Promise<string> {
      return new Promise(resolve => resolve('hashed_value'));
    }
  }

  return new HasherStub();
};

type SutTypes = {
  sut: DbAddAccount;
  hasherStub: Hasher;
};

const mockAddAccountParams = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher();

  const sut = new DbAddAccount(hasherStub);

  return { sut, hasherStub };
};

describe('add()', () => {
  test('ensure DbAddAccount calls hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut();

    const hashSpy = vi.spyOn(hasherStub, 'hash');

    const data = mockAddAccountParams();
    await sut.add(data);

    expect(hashSpy).toHaveBeenCalledWith(data.password);
  });
});
