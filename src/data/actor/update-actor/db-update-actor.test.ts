import { test, describe, expect, vi } from 'vitest';
import { DbUpdateActor } from './db-update-actor';
import { UpdateActorRepository } from '../../protocols/actor/update-actor-repository';
import {
  makeLoadActorByIdRepository as makeLoadActorByIdRepositoryStub,
  makeUpdateActorRepository,
} from '../../../__tests__/factories/actor/infra-factory';
import { LoadActorByIdRepository } from '../../protocols/actor/load-actor-by-id-repository';
import { mockUpdateActorParams } from '../../../__tests__/factories/actor/requested-params-factory';
import { NotFoundError } from '../../../shared/errors';
import { mockActor } from '../../../__tests__/factories/actor/models-factory';

type SutTypes = {
  sut: DbUpdateActor;
  updateActorRepositoryStub: UpdateActorRepository;
  loadActorByIdRepositoryStub: LoadActorByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadActorByIdRepositoryStub = makeLoadActorByIdRepositoryStub();
  const updateActorRepositoryStub = makeUpdateActorRepository();

  const sut = new DbUpdateActor(
    updateActorRepositoryStub,
    loadActorByIdRepositoryStub
  );

  return {
    sut,
    updateActorRepositoryStub,
    loadActorByIdRepositoryStub,
  };
};

describe('DbUpdateActor ', () => {
  test('should call LoadActorByIdRepository with correct values', async () => {
    const { sut, loadActorByIdRepositoryStub } = makeSut();
    const loadByIdSpy = vi.spyOn(loadActorByIdRepositoryStub, 'loadById');

    await sut.update('any_id', mockUpdateActorParams());

    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });
  test('should throw if LoadActorByIdRepository throws', async () => {
    const { sut, loadActorByIdRepositoryStub } = makeSut();
    vi.spyOn(loadActorByIdRepositoryStub, 'loadById').mockRejectedValueOnce(
      new Error()
    );

    await expect(
      sut.update('any_id', mockUpdateActorParams())
    ).rejects.toThrow();
  });
  test('should throw NotFoundError if LoadActorByIdRepository returns null', async () => {
    const { sut, loadActorByIdRepositoryStub } = makeSut();
    vi.spyOn(loadActorByIdRepositoryStub, 'loadById').mockResolvedValueOnce(
      null
    );

    await expect(sut.update('any_id', mockUpdateActorParams())).rejects.toThrow(
      new NotFoundError('Actor not found')
    );
  });
  test('should call UpdateActorRepository with correct values', async () => {
    const { sut, updateActorRepositoryStub } = makeSut();
    const updateSpy = vi.spyOn(updateActorRepositoryStub, 'update');

    const data = mockUpdateActorParams();
    await sut.update('any_id', data);

    expect(updateSpy).toHaveBeenCalledWith('any_id', data);
  });
  test('should throw if UpdateActorRepository throws', async () => {
    const { sut, updateActorRepositoryStub } = makeSut();
    vi.spyOn(updateActorRepositoryStub, 'update').mockRejectedValueOnce(
      new Error()
    );

    await expect(
      sut.update('any_id', mockUpdateActorParams())
    ).rejects.toThrow();
  });
  test('should return an actor on success', async () => {
    const { sut } = makeSut();

    const result = await sut.update('any_id', mockUpdateActorParams());

    expect(result).toEqual({
      ...mockActor(),
      id: 'any_id',
    });
  });
});
