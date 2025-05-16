import { describe, expect, test, vi } from 'vitest';
import { DeleteEpisodeRepository } from '../../protocols/episode/delete-episode-repository';
import { DbDeleteEpisode } from './db-delete-episode';
import {
  makeDeleteEpisodeRepository,
  makeLoadEpisodeByIdRepository,
} from '../../../__tests__/factories/episode/infra-factory';
import { LoadEpisodeByIdRepository } from '../../protocols/episode/load-episode-by-id-repository';
import { NotFoundError } from '../../../shared/errors';

type SutTypes = {
  sut: DbDeleteEpisode;
  deleteEpisodeRepositoryStub: DeleteEpisodeRepository;
  loadEpisodeByIdRepositoryStub: LoadEpisodeByIdRepository;
};

const makeSut = (): SutTypes => {
  const deleteEpisodeRepositoryStub = makeDeleteEpisodeRepository();
  const loadEpisodeByIdRepositoryStub = makeLoadEpisodeByIdRepository();
  const sut = new DbDeleteEpisode(
    deleteEpisodeRepositoryStub,
    loadEpisodeByIdRepositoryStub
  );
  return { sut, deleteEpisodeRepositoryStub, loadEpisodeByIdRepositoryStub };
};

describe('DbDeleteEpisode', () => {
  test('should call DeleteEpisodeRepository with correct id', async () => {
    const { sut, deleteEpisodeRepositoryStub } = makeSut();
    const deleteSpy = vi.spyOn(deleteEpisodeRepositoryStub, 'delete');
    const id = '1';
    await sut.delete(id);
    expect(deleteSpy).toHaveBeenCalledWith(id);
  });
  test('should throw if DeleteEpisodeRepository throws', async () => {
    const { sut, deleteEpisodeRepositoryStub } = makeSut();
    vi.spyOn(deleteEpisodeRepositoryStub, 'delete').mockImplementationOnce(
      async () => {
        return Promise.reject(new Error());
      }
    );

    await expect(sut.delete('1')).rejects.toThrow();
  });
  test('should call LoadEpisodeByIdRepository with correct id', async () => {
    const { sut, loadEpisodeByIdRepositoryStub } = makeSut();
    const loadSpy = vi.spyOn(loadEpisodeByIdRepositoryStub, 'loadById');
    const id = '1';
    await sut.delete(id);
    expect(loadSpy).toHaveBeenCalledWith(id);
  });
  test('should throw if LoadEpisodeByIdRepository throws', async () => {
    const { sut, loadEpisodeByIdRepositoryStub } = makeSut();
    vi.spyOn(loadEpisodeByIdRepositoryStub, 'loadById').mockImplementationOnce(
      async () => {
        return Promise.reject(new Error());
      }
    );

    await expect(sut.delete('1')).rejects.toThrow();
  });
  test('should throw NotFoundError if LoadEpisodeByIdRepository returns null', async () => {
    const { sut, loadEpisodeByIdRepositoryStub } = makeSut();
    vi.spyOn(loadEpisodeByIdRepositoryStub, 'loadById').mockResolvedValueOnce(
      null
    );

    await expect(sut.delete('1')).rejects.toThrow(
      new NotFoundError('Episode not found')
    );
  });
});
