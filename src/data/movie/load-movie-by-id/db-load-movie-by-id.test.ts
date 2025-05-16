import { vi, describe, expect, test } from 'vitest';
import { LoadMovieByIdRepository } from '../../protocols/movie/load-movie-by-id-repository';
import { DbLoadMovieById } from './db-load-movie-by-id';
import { NotFoundError } from '../../../shared/errors';
import { mockMovie } from '../../../__tests__/factories/movie/models-factory';
import { makeLoadMovieByIdRepository } from '../../../__tests__/factories/movie/infra-factory';

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
    const id = '1';
    await sut.loadById(id);
    expect(loadByIdSpy).toHaveBeenCalledWith(id);
  });
  test('should return a movie on success', async () => {
    const { sut } = makeSut();
    const id = '1';
    const movie = await sut.loadById(id);
    expect(movie).toEqual(mockMovie());
  });
  test('should throw NotFoundError if LoadMovieByIdRepository returns null', async () => {
    const { sut, loadMovieByIdRepositoryStub } = makeSut();
    vi.spyOn(loadMovieByIdRepositoryStub, 'loadById').mockResolvedValueOnce(
      null
    );

    await expect(sut.loadById('1')).rejects.toThrow(
      new NotFoundError('Movie not found')
    );
  });
  test('should throw if LoadMovieByIdRepository throws', async () => {
    const { sut, loadMovieByIdRepositoryStub } = makeSut();
    vi.spyOn(loadMovieByIdRepositoryStub, 'loadById').mockRejectedValueOnce(
      new Error()
    );

    await expect(sut.loadById('1')).rejects.toThrow(new Error());
  });
});
