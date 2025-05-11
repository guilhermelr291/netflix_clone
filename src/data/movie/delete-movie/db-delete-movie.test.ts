import { vi, test, describe, expect } from 'vitest';
import { DbDeleteMovie } from './db-delete-movie';
import { DeleteMovieRepository } from '../../protocols/movie/delete-movie-repository';
import { DeleteMovie } from '../../../domain/use-cases/movie/delete-movie';
import { LoadMovieByIdRepository } from '../../protocols/movie/load-movie-by-id-repository';
import { Movie } from '../../../domain/models/movie';
import { NotFoundError } from '../../../shared/errors';

const makeDeleteMovieRepository = () => {
  class DeleteMovieRepositoryStub implements DeleteMovieRepository {
    async deleteById(id: number): Promise<void> {}
  }
  return new DeleteMovieRepositoryStub();
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

const makeLoadMovieByIdRepository = () => {
  class LoadMovieByIdRepositoryStub implements LoadMovieByIdRepository {
    async loadById(id: number): Promise<Movie | null> {
      return new Promise(resolve => resolve(mockMovie()));
    }
  }
  return new LoadMovieByIdRepositoryStub();
};

type SutTypes = {
  sut: DbDeleteMovie;
  deleteMovieRepositoryStub: DeleteMovieRepository;
  loadMovieByIdRepositoryStub: LoadMovieByIdRepository;
};

const makeSut = (): SutTypes => {
  const deleteMovieRepositoryStub = makeDeleteMovieRepository();
  const loadMovieByIdRepositoryStub = makeLoadMovieByIdRepository();
  const sut = new DbDeleteMovie(
    deleteMovieRepositoryStub,
    loadMovieByIdRepositoryStub
  );
  return {
    sut,
    deleteMovieRepositoryStub,
    loadMovieByIdRepositoryStub,
  };
};

describe('DbDeleteMovie UseCase', () => {
  test('Should call DeleteMovieRepository with correct id', async () => {
    const { sut, deleteMovieRepositoryStub } = makeSut();
    const deleteByIdSpy = vi.spyOn(deleteMovieRepositoryStub, 'deleteById');
    const id = 1;
    await sut.delete(id);
    expect(deleteByIdSpy).toHaveBeenCalledWith(id);
  });
  test('Should throw if DeleteMovieRepository throws', async () => {
    const { sut, deleteMovieRepositoryStub } = makeSut();
    vi.spyOn(deleteMovieRepositoryStub, 'deleteById').mockImplementationOnce(
      async () => {
        throw new Error();
      }
    );

    await expect(sut.delete(1)).rejects.toThrow();
  });
  test('Should call LoadMovieByIdRepository with correct id', async () => {
    const { sut, loadMovieByIdRepositoryStub } = makeSut();
    const loadByIdSpy = vi.spyOn(loadMovieByIdRepositoryStub, 'loadById');
    const id = 1;
    await sut.delete(id);
    expect(loadByIdSpy).toHaveBeenCalledWith(id);
  });
  test('Should throw if LoadMovieByIdRepository returns null', async () => {
    const { sut, loadMovieByIdRepositoryStub } = makeSut();
    vi.spyOn(loadMovieByIdRepositoryStub, 'loadById').mockResolvedValueOnce(
      null
    );

    await expect(sut.delete(1)).rejects.toThrow(
      new NotFoundError('Movie not found')
    );
  });

  test('Should throw if LoadMovieByIdRepository throws', async () => {
    const { sut, loadMovieByIdRepositoryStub } = makeSut();
    vi.spyOn(loadMovieByIdRepositoryStub, 'loadById').mockImplementationOnce(
      async () => {
        throw new Error();
      }
    );

    await expect(sut.delete(1)).rejects.toThrow();
  });
});
