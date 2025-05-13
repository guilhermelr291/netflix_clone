import { describe, expect, test, vi } from 'vitest';
import { UserModel } from '../../../domain/models/user';
import { LoadUserByIdRepository } from '../../protocols/user/load-user-by-id-repository';
import { Decrypter } from '../../protocols/cryptography/decrypter';
import { DbLoadUserByToken } from './db-load-user-by-token';
import { mockUser } from '../../../__tests__/factories/user/models-factory';
import { makeLoadUserByIdRepository } from '../../../__tests__/factories/user/infra-factory';

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt(): any {
      return { id: 1 };
    }
  }

  return new DecrypterStub();
};

type SutTypes = {
  sut: DbLoadUserByToken;
  decrypterStub: Decrypter;
  loadUserByIdRepositoryStub: LoadUserByIdRepository;
};

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
      await sut.loadByToken(token, 'USER');

      expect(decryptSpy).toHaveBeenCalledWith(token);
    });
    test('should throw if Decrypter throws', async () => {
      const { sut, decrypterStub } = makeSut();

      vi.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.loadByToken('any_token', 'USER')).rejects.toThrow();
    });
    test('should call LoadUserById with correct id', async () => {
      const { sut, loadUserByIdRepositoryStub } = makeSut();

      const loadByIdSpy = vi.spyOn(loadUserByIdRepositoryStub, 'loadById');

      await sut.loadByToken('any_token', 'USER');

      expect(loadByIdSpy).toHaveBeenCalledWith(1, 'USER');
    });
    test('should return null if LoadUserById returns null', async () => {
      const { sut, loadUserByIdRepositoryStub } = makeSut();

      vi.spyOn(loadUserByIdRepositoryStub, 'loadById').mockResolvedValueOnce(
        null
      );

      const user = await sut.loadByToken('any_token', 'USER');

      expect(user).toBeNull();
    });
    test('should throw if LoadUserById throws', async () => {
      const { sut, loadUserByIdRepositoryStub } = makeSut();

      vi.spyOn(loadUserByIdRepositoryStub, 'loadById').mockImplementationOnce(
        () => {
          throw new Error();
        }
      );

      expect(sut.loadByToken('any_token', 'USER')).rejects.toThrow();
    });
    test('should return an user on success', async () => {
      const { sut } = makeSut();

      const user = await sut.loadByToken('any_token', 'USER');

      expect(user).toEqual(mockUser());
    });
  });
});
