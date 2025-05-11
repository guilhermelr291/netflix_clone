import { vi, test, describe, expect } from 'vitest';
import { LoadMoviesRepository } from '../../protocols/movie/load-movies-repository';
import { Movie } from '../../../domain/models/movie';
import { DbLoadMovies } from './db-load-movies';

const mockMovie = (): Movie => ({
  id: 1,
  title: 'Fake Movie',
  previewUrl: 'http://example.com/preview',
  thumbnailUrl: 'http://example.com/thumbnail',
  description: 'This is a fake movie description.',
  rating: 4.5,
  releaseYear: 2023,
  durationInMinutes: 120,
});
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
});
