import { describe, expect, test, vi } from 'vitest';
import { DeleteEpisodeRepository } from '../../protocols/episode/delete-episode-repository';
import { DbDeleteEpisode } from './db-delete-episode';
import { makeDeleteEpisodeRepository } from '../../../__tests__/factories/episode/infra-factory';

type SutTypes = {
  sut: DbDeleteEpisode;
  deleteEpisodeRepositoryStub: DeleteEpisodeRepository;
};

const makeSut = (): SutTypes => {
  const deleteEpisodeRepositoryStub = makeDeleteEpisodeRepository();
  const sut = new DbDeleteEpisode(deleteEpisodeRepositoryStub);
  return { sut, deleteEpisodeRepositoryStub };
};

describe('DbDeleteEpisode', () => {
  test('should call DeleteEpisodeRepository with correct id', async () => {
    const { sut, deleteEpisodeRepositoryStub } = makeSut();
    const deleteSpy = vi.spyOn(deleteEpisodeRepositoryStub, 'delete');
    const id = 1;
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

    await expect(sut.delete(1)).rejects.toThrow();
  });
});
