import { describe, test, vi, expect } from 'vitest';
import { makeAddActorRepositoryStub } from '../../../__tests__/factories/actor/infra-factory';
import { DbAddActor } from './db-add-actor';
import { AddActorRepository } from '../../protocols/actor/add-actor-repository';
import { mockAddActorParams } from '../../../__tests__/factories/actor/requested-params-factory';
import { mockActor } from '../../../__tests__/factories/actor/models-factory';

type SutTypes = {
  sut: DbAddActor;
  addActorRepositoryStub: AddActorRepository;
};

const makeSut = (): SutTypes => {
  const addActorRepositoryStub = makeAddActorRepositoryStub();
  const sut = new DbAddActor(addActorRepositoryStub);
  return {
    sut,
    addActorRepositoryStub,
  };
};

describe('DbAddActor', () => {
  test('should call AddActorRepository with correct values', async () => {
    const { sut, addActorRepositoryStub } = makeSut();
    const addSpy = vi.spyOn(addActorRepositoryStub, 'add');
    const data = mockAddActorParams();
    await sut.add(data);
    expect(addSpy).toHaveBeenCalledWith(data);
  });
  test('should throw if AddActorRepository throws', async () => {
    const { sut, addActorRepositoryStub } = makeSut();
    vi.spyOn(addActorRepositoryStub, 'add').mockRejectedValueOnce(new Error());
    await expect(sut.add(mockAddActorParams())).rejects.toThrow();
  });
  test('should return an actor on success', async () => {
    const { sut } = makeSut();
    const data = mockAddActorParams();
    const actor = await sut.add(data);
    expect(actor).toEqual(mockActor());
  });
});
