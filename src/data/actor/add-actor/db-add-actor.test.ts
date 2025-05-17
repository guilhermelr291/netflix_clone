import { describe, test, vi, expect } from 'vitest';
import { makeAddActorRepositoryStub } from '../../../__tests__/factories/actor/infra-factory';
import { DbAddActor } from './db-add-actor';
import { AddActorRepository } from '../../protocols/actor/add-actor-repository';
import { mockAddActorParams } from '../../../__tests__/factories/actor/requested-params-factory';

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
});
