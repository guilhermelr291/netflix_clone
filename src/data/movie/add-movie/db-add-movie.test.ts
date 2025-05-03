import { vi, test, describe, expect } from 'vitest';
import { DbAddMovie } from './db-add-movie';
import { LoadMovieByTitleRepository } from '../../protocols/movie/load-movie-by-title-repository';
import { Movie } from '../../../domain/models/movie';
import { ConflictError } from '../../../shared/errors';

type sutTypes = {
  sut: DbAddMovie;
  loadMovieByTitleRepositoryStub: LoadMovieByTitleRepository;
};

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
    loadByTitle(title: string): Promise<Movie | null> {
      return new Promise(resolve => resolve(null));
    }
  }

  return new LoadMovieByTitleRepositoryStub();
};

const makeSut = (): sutTypes => {
  const loadMovieByTitleRepositoryStub = makeLoadMovieByTitleRepository();
  const sut = new DbAddMovie(loadMovieByTitleRepositoryStub);

  return { sut, loadMovieByTitleRepositoryStub };
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
});
