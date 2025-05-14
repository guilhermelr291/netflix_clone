import { vi, test, describe, expect } from 'vitest';
import { AddMovie } from '../../../../domain/use-cases/movie/add-movie';
import { Movie } from '../../../../domain/models/movie';
import { AddMovieController } from './add-movie-controller';
import { created } from '../../../helpers/http-helper';
import { mockMovie } from '../../../../__tests__/factories/movie/models-factory';
import { mockAddMovieParams } from '../../../../__tests__/factories/movie/requested-params-factory';
import { makeAddMovie } from '../../../../__tests__/factories/movie/domain-factory';

type SutTypes = {
  sut: AddMovieController;
  addMovieStub: AddMovie;
};

const makeSut = (): SutTypes => {
  const addMovieStub = makeAddMovie();
  const sut = new AddMovieController(addMovieStub);

  return { sut, addMovieStub };
};

describe('AddMovieController', () => {
  test('should call AddMovie with correct ', async () => {
    const { sut, addMovieStub } = makeSut();

    const addSpy = vi.spyOn(addMovieStub, 'add');

    const addMovieParams = mockAddMovieParams();

    await sut.handle(addMovieParams);

    expect(addSpy).toHaveBeenCalledWith(addMovieParams);
  });
  test('should throw if AddMovie throws', async () => {
    const { sut, addMovieStub } = makeSut();

    vi.spyOn(addMovieStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.handle(mockAddMovieParams())).rejects.toThrow();
  });
  test('should return created movie and correct status on success', async () => {
    const { sut } = makeSut();

    const result = await sut.handle(mockAddMovieParams());

    expect(result).toEqual(created(mockMovie()));
  });
});
