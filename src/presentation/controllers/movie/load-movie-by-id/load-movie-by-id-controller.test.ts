import { vi, test, describe, expect } from 'vitest';
import { LoadMovieById } from '../../../../domain/use-cases/movie/load-movie-by-id';
import { LoadMovieByIdController } from './load-movie-by-id-controller';
import { ok } from '../../../helpers/http-helper';
import { Movie } from '../../../../domain/models/movie';
import { mockMovie } from '../../../../__tests__/factories/movie/movie-factory';
import { makeLoadMovieById } from '../../../../__tests__/factories/movie/domain-factory';

type SutTypes = {
  sut: LoadMovieByIdController;
  loadMovieByIdStub: LoadMovieById;
};

const makeSut = (): SutTypes => {
  const loadMovieByIdStub = makeLoadMovieById();
  const sut = new LoadMovieByIdController(loadMovieByIdStub);

  return { sut, loadMovieByIdStub };
};

const mockRequestData = () => ({
  id: '1',
});

describe('LoadMovieByIdController', () => {
  test('should call loadMovieById with correct id', async () => {
    const { sut, loadMovieByIdStub } = makeSut();
    const loadByIdSpy = vi.spyOn(loadMovieByIdStub, 'loadById');
    const request = mockRequestData();

    await sut.handle(request);

    expect(loadByIdSpy).toHaveBeenCalledWith(1);
  });

  test('should return movie on success', async () => {
    const { sut } = makeSut();
    const request = mockRequestData();

    const response = await sut.handle(request);

    expect(response).toEqual(ok(mockMovie()));
  });

  test('should convert string id to number', async () => {
    const { sut, loadMovieByIdStub } = makeSut();
    const loadByIdSpy = vi.spyOn(loadMovieByIdStub, 'loadById');
    const request = mockRequestData();

    await sut.handle(request);

    expect(loadByIdSpy).toHaveBeenCalledWith(Number(request.id));
  });

  test('should throw if loadMovieById throws', async () => {
    const { sut, loadMovieByIdStub } = makeSut();
    vi.spyOn(loadMovieByIdStub, 'loadById').mockImplementationOnce(() => {
      throw new Error();
    });

    const request = mockRequestData();

    await expect(sut.handle(request)).rejects.toThrow();
  });
});
