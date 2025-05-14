import { describe, test, vi, expect } from 'vitest';
import { DbAddEpisode } from './db-add-episode';
import { AddEpisodeRepository } from '../../protocols/episode/add-episode-repository';
import { makeLoadMovieByIdRepository } from '../../../__tests__/factories/movie/infra-factory';
import { makeAddEpisodeRepository } from '../../../__tests__/factories/episode/infra-factory';
import { mockAddEpisodeParams } from '../../../__tests__/factories/episode/requested-params-factory';
import { mockEpisode } from '../../../__tests__/factories/episode/models-factory';
import { LoadMovieByIdRepository } from '../../protocols/movie/load-movie-by-id-repository';

type SutTypes = {
  sut: DbAddEpisode;
  addEpisodeRepositoryStub: AddEpisodeRepository;
  loadMovieByIdRepositoryStub: LoadMovieByIdRepository;
};

const makeSut = (): SutTypes => {
  const addEpisodeRepositoryStub = makeAddEpisodeRepository();
  const loadMovieByIdRepositoryStub = makeLoadMovieByIdRepository();
  const sut = new DbAddEpisode(
    addEpisodeRepositoryStub,
    loadMovieByIdRepositoryStub
  );

  return {
    sut,
    addEpisodeRepositoryStub,
    loadMovieByIdRepositoryStub,
  };
};

describe('DbAddEpisode', () => {
  test('Should call AddEpisodeRepository with correct values', async () => {
    const { sut, addEpisodeRepositoryStub } = makeSut();
    const addSpy = vi.spyOn(addEpisodeRepositoryStub, 'add');
    const data = mockAddEpisodeParams();
    await sut.add(data);
    expect(addSpy).toHaveBeenCalledWith(data);
  });
  test('Should throw if AddEpisodeRepository throws', async () => {
    const { sut, addEpisodeRepositoryStub } = makeSut();
    vi.spyOn(addEpisodeRepositoryStub, 'add').mockRejectedValueOnce(
      new Error()
    );
    await expect(sut.add(mockAddEpisodeParams())).rejects.toThrow();
  });
  test('Should return value from AddEpisodeRepository on success', async () => {
    const { sut } = makeSut();
    const data = mockAddEpisodeParams();
    const episode = await sut.add(data);
    expect(episode).toEqual(mockEpisode());
  });
  test('Should call LoadMovieByIdRepository with correct values', async () => {
    const { sut, loadMovieByIdRepositoryStub } = makeSut();
    const loadSpy = vi.spyOn(loadMovieByIdRepositoryStub, 'loadById');
    const data = mockAddEpisodeParams();
    await sut.add(data);
    expect(loadSpy).toHaveBeenCalledWith(data.movieId);
  });
  test('Should throw if LoadMovieByIdRepository throws', async () => {
    const { sut, loadMovieByIdRepositoryStub } = makeSut();
    vi.spyOn(loadMovieByIdRepositoryStub, 'loadById').mockRejectedValueOnce(
      new Error()
    );
    await expect(sut.add(mockAddEpisodeParams())).rejects.toThrow();
  });
});
