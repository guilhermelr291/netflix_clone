import { describe, expect, test, vi } from 'vitest';
import { NotFoundError } from '../../../shared/errors';
import { DbDeleteActor } from './db-delete-actor';
import { DeleteActorRepository } from '../../protocols/actor/delete-actor-repository';
import {
  makeDeleteActorRepositoryStub,
  makeLoadActorByIdRepository,
} from '../../../__tests__/factories/actor/infra-factory';
import { LoadActorByIdRepository } from '../../protocols/actor/load-actor-by-id-repository';

type SutTypes = {
  sut: DbDeleteActor;
  deleteActorRepositoryStub: DeleteActorRepository;
  loadActorByIdRepositoryStub: LoadActorByIdRepository;
};

const makeSut = (): SutTypes => {
  const deleteActorRepositoryStub = makeDeleteActorRepositoryStub();
  const loadActorByIdRepositoryStub = makeLoadActorByIdRepository();
  const sut = new DbDeleteActor(
    deleteActorRepositoryStub,
    loadActorByIdRepositoryStub
  );
  return { sut, deleteActorRepositoryStub, loadActorByIdRepositoryStub };
};

describe('DbDeleteActor', () => {
  test('should call DeleteActorRepository with correct id', async () => {
    const { sut, deleteActorRepositoryStub } = makeSut();
    const deleteSpy = vi.spyOn(deleteActorRepositoryStub, 'delete');
    const id = '1';
    await sut.delete(id);
    expect(deleteSpy).toHaveBeenCalledWith(id);
  });
  test('should throw if DeleteActorRepository throws', async () => {
    const { sut, deleteActorRepositoryStub } = makeSut();
    vi.spyOn(deleteActorRepositoryStub, 'delete').mockRejectedValueOnce(
      new Error()
    );

    await expect(sut.delete('1')).rejects.toThrow();
  });
  test('should call LoadActorByIdRepository with correct id', async () => {
    const { sut, loadActorByIdRepositoryStub } = makeSut();
    const loadSpy = vi.spyOn(loadActorByIdRepositoryStub, 'loadById');
    const id = '1';
    await sut.delete(id);
    expect(loadSpy).toHaveBeenCalledWith(id);
  });
  test('should throw if LoadActorByIdRepository throws', async () => {
    const { sut, loadActorByIdRepositoryStub } = makeSut();
    vi.spyOn(loadActorByIdRepositoryStub, 'loadById').mockImplementationOnce(
      async () => {
        return Promise.reject(new Error());
      }
    );

    await expect(sut.delete('1')).rejects.toThrow();
  });
  test('should throw NotFoundError if LoadActorByIdRepository returns null', async () => {
    const { sut, loadActorByIdRepositoryStub } = makeSut();
    vi.spyOn(loadActorByIdRepositoryStub, 'loadById').mockResolvedValueOnce(
      null
    );

    await expect(sut.delete('1')).rejects.toThrow(
      new NotFoundError('Actor not found')
    );
  });
});
