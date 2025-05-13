import { vi, test, describe, expect } from 'vitest';
import { DbAddMovie } from './db-add-movie';
import { LoadMovieByTitleRepository } from '../../protocols/movie/load-movie-by-title-repository';
import { Movie } from '../../../domain/models/movie';
import { ConflictError } from '../../../shared/errors';
import { AddMovieRepository } from '../../protocols/movie/add-movie-repository';
import { AddMovie } from '../../../domain/use-cases/movie/add-movie';
import { mockMovie } from '../../../__tests__/factories/movie/models-factory';
import {
  makeAddMovieByRepository,
  makeLoadMovieByTitleRepository,
} from '../../../__tests__/factories/movie/infra-factory';
import { mockAddMovieParams } from '../../../__tests__/factories/movie/request-params-factory';

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
