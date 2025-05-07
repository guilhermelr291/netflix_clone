import { describe, expect, test, vi } from 'vitest';
import { UserModel } from '../../../domain/models/user';
import { LoadUserByIdRepository } from '../../protocols/user/load-user-by-id-repository';
import { Decrypter } from '../../protocols/cryptography/decrypter';
import { DbLoadUserByToken } from './db-load-user-by-token';

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt(): any {
      return { id: 1 };
    }
  }

  return new DecrypterStub();
};

const makeLoadUserByIdRepository = (): LoadUserByIdRepository => {
  class LoadUserByIdRepositoryStub implements LoadUserByIdRepository {
    loadById(id: number): Promise<UserModel | null> {
      return new Promise(resolve => resolve(mockUser()));
    }
  }

  return new LoadUserByIdRepositoryStub();
};

type SutTypes = {
  sut: DbLoadUserByToken;
  decrypterStub: Decrypter;
  loadUserByIdRepositoryStub: LoadUserByIdRepository;
};

const mockUser = (): UserModel => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
  role: 'USER',
});

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter();
  const loadUserByIdRepositoryStub = makeLoadUserByIdRepository();

  const sut = new DbLoadUserByToken(loadUserByIdRepositoryStub, decrypterStub);

  return {
    sut,
    decrypterStub,
    loadUserByIdRepositoryStub,
  };
};

describe('DbLoadUserByToken', () => {
  describe('loadByToken()', () => {
    //TODO: corrigir nomes ou teste
    test('should call Decrypter with correct value', async () => {
      const { sut, decrypterStub } = makeSut();

      const decryptSpy = vi.spyOn(decrypterStub, 'decrypt');

      const token = 'any_token';
      await sut.loadByToken(token);

      expect(decryptSpy).toHaveBeenCalledWith(token);
    });
    test('should throw if Decrypter throws', async () => {
      const { sut, decrypterStub } = makeSut();

      vi.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.loadByToken('any_token')).rejects.toThrow();
    });
    test('should call LoadUserById with correct id', async () => {
      const { sut, loadUserByIdRepositoryStub } = makeSut();

      const loadByIdSpy = vi.spyOn(loadUserByIdRepositoryStub, 'loadById');

      await sut.loadByToken('any_token');

      expect(loadByIdSpy).toHaveBeenCalledWith(1);
    });
    test('should return null if LoadUserById returns null', async () => {
      const { sut, loadUserByIdRepositoryStub } = makeSut();

      vi.spyOn(loadUserByIdRepositoryStub, 'loadById').mockResolvedValueOnce(
        null
      );

      const user = await sut.loadByToken('any_token');

      expect(user).toBeNull();
    });
    test('should throw if LoadUserById throws', async () => {
      const { sut, loadUserByIdRepositoryStub } = makeSut();

      vi.spyOn(loadUserByIdRepositoryStub, 'loadById').mockImplementationOnce(
        () => {
          throw new Error();
        }
      );

      expect(sut.loadByToken('any_token')).rejects.toThrow();
    });
    test('should return an user on success', async () => {
      const { sut } = makeSut();

      const user = await sut.loadByToken('any_token');

      expect(user).toEqual(mockUser());
    });
  });
});
