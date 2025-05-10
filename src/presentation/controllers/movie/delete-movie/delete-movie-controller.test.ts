import { vi, test, describe, expect, should } from 'vitest';
import { DeleteMovie } from '../../../../domain/use-cases/movie/delete-movie';
import { DeleteMovieController } from './delete-movie-controller';
import { ok } from '../../../helpers/http-helper';

const makeDeleteMovie = (): DeleteMovie => {
  class DeleteMovieStub implements DeleteMovie {
    async delete(id: number): Promise<void> {}
  }

  return new DeleteMovieStub();
};

type SutTypes = {
  sut: DeleteMovieController;
  deleteMovieStub: DeleteMovie;
};

const makeSut = (): SutTypes => {
  const deleteMovieStub = makeDeleteMovie();
  const sut = new DeleteMovieController(deleteMovieStub);

  return { sut, deleteMovieStub };
};

const mockRequestData = (): DeleteMovieController.Params => ({
  id: 1,
});

describe('DeleteMovieController', () => {
  test('should call deleteMovie with correct id', async () => {
    const { sut, deleteMovieStub } = makeSut();
    const deleteSpy = vi.spyOn(deleteMovieStub, 'delete');
    const data = mockRequestData();

    await sut.handle(data);

    expect(deleteSpy).toHaveBeenCalledWith(data.id);
  });
  test('should return correct status and message on success', async () => {
    const { sut } = makeSut();
    const data = mockRequestData();

    const response = await sut.handle(data);

    expect(response).toEqual(ok({ message: 'movie deleted successfully' }));
  });
  test('should throw if deleteMovie throws', async () => {
    const { sut, deleteMovieStub } = makeSut();
    vi.spyOn(deleteMovieStub, 'delete').mockImplementationOnce(() => {
      throw new Error();
    });

    const data = mockRequestData();

    await expect(sut.handle(data)).rejects.toThrow();
  });
});
