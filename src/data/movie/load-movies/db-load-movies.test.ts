import { vi, test, describe, expect } from 'vitest';
import { LoadMoviesRepository } from '../../protocols/movie/load-movies-repository';
import { Movie } from '../../../domain/models/movie';
import { DbLoadMovies } from './db-load-movies';
import { mockMovie } from '../../../__tests__/factories/movie/models-factory';

const mockAnotherMovie = (): Movie => ({
  id: 2,
  title: 'Another Fake Movie',
  previewUrl: 'http://example.com/preview',
  thumbnailUrl: 'http://example.com/thumbnail',
  description: 'This is another fake movie description.',
  rating: 5,
  releaseYear: 2025,
  durationInMinutes: 150,
});

const makeLoadMoviesRepository = () => {
  class LoadMoviesRepositoryStub implements LoadMoviesRepository {
    async loadAll(): Promise<Movie[]> {
      return new Promise(resolve => resolve([mockMovie(), mockAnotherMovie()]));
    }
  }
  return new LoadMoviesRepositoryStub();
};

type SutTypes = {
  sut: DbLoadMovies;
  loadMoviesRepositoryStub: LoadMoviesRepository;
};

const makeSut = (): SutTypes => {
  const loadMoviesRepositoryStub = makeLoadMoviesRepository();
  const sut = new DbLoadMovies(loadMoviesRepositoryStub);
  return {
    sut,
    loadMoviesRepositoryStub,
  };
};

describe('DbLoadMovies', () => {
  test('should call LoadMoviesRepository', async () => {
    const { sut, loadMoviesRepositoryStub } = makeSut();
    const loadAllSpy = vi.spyOn(loadMoviesRepositoryStub, 'loadAll');
    await sut.loadAll();
    expect(loadAllSpy).toHaveBeenCalledTimes(1);
  });
  test('should return value returned by LoadMoviesRepository on success', async () => {
    const { sut } = makeSut();
    const movies = await sut.loadAll();
    expect(movies).toEqual([mockMovie(), mockAnotherMovie()]);
  });
  test('should throw if LoadMoviesRepository throws', async () => {
    const { sut, loadMoviesRepositoryStub } = makeSut();
    vi.spyOn(loadMoviesRepositoryStub, 'loadAll').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.loadAll()).rejects.toThrow();
  });
});
