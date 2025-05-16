import { vi, test, expect, describe } from 'vitest';
import { makeLoadEpisodeByIdStub } from '../../../../__tests__/factories/episode/domain-factory';
import { LoadEpisodeByIdController } from './load-episode-by-id-controller';
import { LoadEpisodeById } from '../../../../domain/use-cases/episode/load-episode-by-id';

type SutTypes = {
  sut: LoadEpisodeByIdController;
  loadEpisodeByIdStub: LoadEpisodeById;
};

const makeSut = (): SutTypes => {
  const loadEpisodeByIdStub = makeLoadEpisodeByIdStub();
  const sut = new LoadEpisodeByIdController(loadEpisodeByIdStub);
  return {
    sut,
    loadEpisodeByIdStub,
  };
};

const mockRequest = {
  id: '1',
};

describe('LoadEpisodeByIdController', () => {
  test('should call LoadEpisodeById with correct values', async () => {
    const { sut, loadEpisodeByIdStub } = makeSut();
    const loadSpy = vi.spyOn(loadEpisodeByIdStub, 'load');
    await sut.handle(mockRequest);
    expect(loadSpy).toHaveBeenCalledWith(mockRequest.id);
  });
});
