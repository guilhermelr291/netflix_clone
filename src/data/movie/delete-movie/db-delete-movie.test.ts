import { vi, test, describe, expect } from 'vitest';
import { DbDeleteMovie } from './db-delete-movie';
import { DeleteMovieRepository } from '../../protocols/movie/delete-movie-repository';
import { DeleteMovie } from '../../../domain/use-cases/movie/delete-movie';

const makeDeleteMovieRepository = () => {
  class DeleteMovieRepositoryStub implements DeleteMovieRepository {
    async deleteById(id: number): Promise<void> {}
  }
  return new DeleteMovieRepositoryStub();
};

type SutTypes = {
  sut: DbDeleteMovie;
  deleteMovieRepositoryStub: DeleteMovieRepository;
};

const makeSut = (): SutTypes => {
  const deleteMovieRepositoryStub = makeDeleteMovieRepository();
  const sut = new DbDeleteMovie(deleteMovieRepositoryStub);
  return {
    sut,
    deleteMovieRepositoryStub,
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
});
