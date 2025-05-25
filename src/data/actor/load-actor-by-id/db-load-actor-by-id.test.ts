import { vi, test, describe, expect } from 'vitest';
import { makeLoadActorByIdRepository } from '../../../__tests__/factories/actor/infra-factory';
import { DbLoadActorById } from './db-load-actor-by-id';
import { LoadActorByIdRepository } from '../../protocols/actor/load-actor-by-id-repository';
import { mockActor } from '../../../__tests__/factories/actor/models-factory';

type SutTypes = {
  sut: DbLoadActorById;
  loadActorByIdRepositoryStub: LoadActorByIdRepository;
};

const makeSut = () => {
  const loadActorByIdRepositoryStub = makeLoadActorByIdRepository();
  const sut = new DbLoadActorById(loadActorByIdRepositoryStub);
  return {
    sut,
    loadActorByIdRepositoryStub,
  };
};

describe('DbLoadActorById', () => {
  test('should call LoadActorByIdRepository with correct values', async () => {
    const { sut, loadActorByIdRepositoryStub } = makeSut();
    const loadByIdSpy = vi.spyOn(loadActorByIdRepositoryStub, 'loadById');

    await sut.loadById('any_id');

    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });
  test('should return an actor on success', async () => {
    const { sut } = makeSut();

    const actor = await sut.loadById('any_id');

    expect(actor).toEqual(mockActor());
  });
  test('should throw if LoadActorByIdRepository throws', async () => {
    const { sut, loadActorByIdRepositoryStub } = makeSut();
    vi.spyOn(loadActorByIdRepositoryStub, 'loadById').mockImplementationOnce(
      () => {
        throw new Error();
      }
    );

    await expect(sut.loadById('any_id')).rejects.toThrow();
  });
});
