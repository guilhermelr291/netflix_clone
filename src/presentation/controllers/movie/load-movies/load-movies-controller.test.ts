import { vi, test, describe, expect } from 'vitest';
import { loadMovies } from '../../../../domain/use-cases/movie/load-movies';
import { LoadMoviesController } from './load-movies-controller';
import { ok } from '../../../helpers/http-helper';

const mockMoviesModel = () => [
  {
    id: 1,
    title: 'Test Movie 1',
    previewUrl: 'http://example.com/preview1',
    thumbnailUrl: 'http://example.com/thumbnail1',
    description: 'A test movie description',
    rating: 4.5,
    releaseYear: 2023,
    duration: 120,
    favorites: [],
    cast: [],
    episodes: [],
    genres: [],
  },
  {
    id: 2,
    title: 'Test Movie 2',
    previewUrl: 'http://example.com/preview2',
    thumbnailUrl: 'http://example.com/thumbnail2',
    description: 'Another test movie description',
    rating: 3.8,
    releaseYear: 2022,
    duration: 105,
    favorites: [],
    cast: [],
    episodes: [],
    genres: [],
  },
];

const makeLoadMovies = (): loadMovies => {
  class LoadMoviesStub implements loadMovies {
    async loadAll(): Promise<any[]> {
      return mockMoviesModel();
    }
  }

  return new LoadMoviesStub();
};

type SutTypes = {
  sut: LoadMoviesController;
  loadMoviesStub: loadMovies;
};

const makeSut = (): SutTypes => {
  const loadMoviesStub = makeLoadMovies();
  const sut = new LoadMoviesController(loadMoviesStub);

  return { sut, loadMoviesStub };
};

describe('LoadMoviesController', () => {
  test('should call loadMovies', async () => {
    const { sut, loadMoviesStub } = makeSut();
    const loadAllSpy = vi.spyOn(loadMoviesStub, 'loadAll');

    await sut.handle({});

    expect(loadAllSpy).toHaveBeenCalled();
  });

  test('should return correct value on success', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({});

    expect(response).toEqual(ok(mockMoviesModel()));
  });

  test('should throw if loadMovies throws', async () => {
    const { sut, loadMoviesStub } = makeSut();
    vi.spyOn(loadMoviesStub, 'loadAll').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.handle({})).rejects.toThrow();
  });
});
