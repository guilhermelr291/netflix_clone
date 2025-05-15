import { vi, test, expect, describe } from 'vitest';
import { DeleteEpisodeController } from './delete-episode-controller';
import { makeDeleteEpisodeStub } from '../../../../__tests__/factories/episode/domain-factory';
import { DeleteEpisode } from '../../../../domain/use-cases/episode/delete-episode';

type SutTypes = {
  sut: DeleteEpisodeController;
  deleteEpisodeStub: DeleteEpisode;
};

const makeSut = (): SutTypes => {
  const deleteEpisodeStub = makeDeleteEpisodeStub();
  const sut = new DeleteEpisodeController(deleteEpisodeStub);
  return {
    sut,
    deleteEpisodeStub,
  };
};

const mockRequest = {
  id: 1,
};

describe('DeleteEpisodeController', () => {
  test('should call DeleteEpisode with correct values', async () => {
    const { sut, deleteEpisodeStub } = makeSut();
    const deleteSpy = vi.spyOn(deleteEpisodeStub, 'delete');

    await sut.handle(mockRequest);
    expect(deleteSpy).toHaveBeenCalledWith(mockRequest.id);
  });
});
