import { vi, describe, expect, test } from 'vitest';
import { LoadMovieByIdRepository } from '../../protocols/movie/load-movie-by-id-repository';
import { Movie } from '../../../../generated/prisma';
import { DbLoadMovieById } from './db-load-movie-by-id';
import { NotFoundError } from '../../../shared/errors';

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

const makeLoadMovieByIdRepository = () => {
  class LoadMovieByIdRepositoryStub implements LoadMovieByIdRepository {
    async loadById(id: number): Promise<Movie | null> {
      return new Promise(resolve => resolve(mockMovie()));
    }
  }
  return new LoadMovieByIdRepositoryStub();
};

type SutTypes = {
  sut: DbLoadMovieById;
  loadMovieByIdRepositoryStub: LoadMovieByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadMovieByIdRepositoryStub = makeLoadMovieByIdRepository();
  const sut = new DbLoadMovieById(loadMovieByIdRepositoryStub);
  return {
    sut,
    loadMovieByIdRepositoryStub,
  };
};

describe('DbLoadMovieById', () => {
  test('should call LoadMovieByIdRepository with correct id', async () => {
    const { sut, loadMovieByIdRepositoryStub } = makeSut();
    const loadByIdSpy = vi.spyOn(loadMovieByIdRepositoryStub, 'loadById');
    const id = 1;
    await sut.loadById(id);
    expect(loadByIdSpy).toHaveBeenCalledWith(id);
  });
  test('should return a movie on success', async () => {
    const { sut } = makeSut();
    const id = 1;
    const movie = await sut.loadById(id);
    expect(movie).toEqual(mockMovie());
  });
  test('should throw NotFoundError if LoadMovieByIdRepository returns null', async () => {
    const { sut, loadMovieByIdRepositoryStub } = makeSut();
    vi.spyOn(loadMovieByIdRepositoryStub, 'loadById').mockResolvedValueOnce(
      null
    );

    await expect(sut.loadById(1)).rejects.toThrow(
      new NotFoundError('Movie not found')
    );
  });
});
