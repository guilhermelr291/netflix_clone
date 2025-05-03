import { vi, test, describe, expect } from 'vitest';
import { DbAddMovie } from './db-add-movie';
import { LoadMovieByTitleRepository } from '../../protocols/movie/load-movie-by-title-repository';
import { Movie } from '../../../domain/models/movie';
import { ConflictError } from '../../../shared/errors';
import { AddMovieRepository } from '../../protocols/movie/add-movie-repository';
import { AddMovie } from '../../../domain/use-cases/movie/add-movie';

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
const mockAddMovieParams = (): Omit<Movie, 'id'> => ({
  title: 'Fake Movie',
  previewUrl: 'http://example.com/preview',
  thumbnailUrl: 'http://example.com/thumbnail',
  description: 'This is a fake movie description.',
  rating: 4.5,
  releaseYear: 2023,
  durationInMinutes: 120,
});

const makeLoadMovieByTitleRepository = (): LoadMovieByTitleRepository => {
  class LoadMovieByTitleRepositoryStub implements LoadMovieByTitleRepository {
    async loadByTitle(title: string): Promise<Movie | null> {
      return new Promise(resolve => resolve(null));
    }
  }

  return new LoadMovieByTitleRepositoryStub();
};
const makeAddMovieByRepository = (): AddMovieRepository => {
  class AddMovieRepositoryStub implements AddMovieRepository {
    async add(data: AddMovie.Params): Promise<Movie> {
      return new Promise(resolve => resolve(mockMovie()));
    }
  }

  return new AddMovieRepositoryStub();
};

type sutTypes = {
  sut: DbAddMovie;
  loadMovieByTitleRepositoryStub: LoadMovieByTitleRepository;
  addMovieRepositoryStub: AddMovieRepository;
};

const makeSut = (): sutTypes => {
  const loadMovieByTitleRepositoryStub = makeLoadMovieByTitleRepository();
  const addMovieRepositoryStub = makeAddMovieByRepository();
  const sut = new DbAddMovie(
    loadMovieByTitleRepositoryStub,
    addMovieRepositoryStub
  );

  return { sut, loadMovieByTitleRepositoryStub, addMovieRepositoryStub };
};

describe('DbAddMovie', () => {
  test('should call LoadMovieByTitleRepository with correct value', async () => {
    const { sut, loadMovieByTitleRepositoryStub } = makeSut();
    const loadByTitleSpy = vi.spyOn(
      loadMovieByTitleRepositoryStub,
      'loadByTitle'
    );

    const params = mockAddMovieParams();

    await sut.add(params);

    expect(loadByTitleSpy).toHaveBeenCalledWith(params.title);
  });
  test('should throw ConflictError if LoadMovieByTitleRepository returns a movie', async () => {
    const { sut, loadMovieByTitleRepositoryStub } = makeSut();
    vi.spyOn(
      loadMovieByTitleRepositoryStub,
      'loadByTitle'
    ).mockResolvedValueOnce(mockMovie());

    expect(sut.add(mockAddMovieParams())).rejects.toThrow(ConflictError);
  });
  test('should throw if LoadMovieByTitleRepository throws', async () => {
    const { sut, loadMovieByTitleRepositoryStub } = makeSut();
    vi.spyOn(
      loadMovieByTitleRepositoryStub,
      'loadByTitle'
    ).mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.add(mockAddMovieParams())).rejects.toThrow();
  });

  test('should call AddMovieRepository with correct data', async () => {
    const { sut, addMovieRepositoryStub } = makeSut();
    const loadByTitleSpy = vi.spyOn(addMovieRepositoryStub, 'add');

    const params = mockAddMovieParams();

    await sut.add(params);

    expect(loadByTitleSpy).toHaveBeenCalledWith(params);
  });

  test('should throw if AddMovieRepository throws', async () => {
    const { sut, addMovieRepositoryStub } = makeSut();
    vi.spyOn(addMovieRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.add(mockAddMovieParams())).rejects.toThrow();
  });
  test('should return created movie on success', async () => {
    const { sut } = makeSut();

    const result = await sut.add(mockAddMovieParams());

    expect(result).toEqual(mockMovie());
  });
});
