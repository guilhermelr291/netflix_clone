import { vi, test, describe, expect } from 'vitest';
import { LoadMovies } from '../../../../domain/use-cases/movie/load-movies';
import { LoadMoviesController } from './load-movies-controller';
import { ok } from '../../../helpers/http-helper';
import { makeLoadMovies } from '../../../../__tests__/factories/movie/domain-factory';
import { mockMoviesModel } from '../../../../__tests__/factories/movie/models-factory';

type SutTypes = {
  sut: LoadMoviesController;
  loadMoviesStub: LoadMovies;
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
