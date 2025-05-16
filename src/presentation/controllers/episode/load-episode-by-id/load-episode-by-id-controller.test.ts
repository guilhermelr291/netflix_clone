import { vi, test, expect, describe, afterAll, beforeAll } from 'vitest';
import { makeLoadEpisodeByIdStub } from '../../../../__tests__/factories/episode/domain-factory';
import { LoadEpisodeByIdController } from './load-episode-by-id-controller';
import { LoadEpisodeById } from '../../../../domain/use-cases/episode/load-episode-by-id';
import { ok } from '../../../helpers/http-helper';
import { mockEpisode } from '../../../../__tests__/factories/episode/models-factory';
import mockDate from 'mockdate';

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
  beforeAll(() => {
    mockDate.set(new Date());
  });
  afterAll(() => {
    mockDate.reset();
  });

  test('should call LoadEpisodeById with correct values', async () => {
    const { sut, loadEpisodeByIdStub } = makeSut();
    const loadSpy = vi.spyOn(loadEpisodeByIdStub, 'load');
    await sut.handle(mockRequest);
    expect(loadSpy).toHaveBeenCalledWith(mockRequest.id);
  });
  test('should return 200 and Episode on success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(mockRequest);
    expect(response).toEqual(ok(mockEpisode()));
  });
  test('should throw if LoadEpisodeById throws', async () => {
    const { sut, loadEpisodeByIdStub } = makeSut();
    vi.spyOn(loadEpisodeByIdStub, 'load').mockRejectedValueOnce(new Error());
    await expect(sut.handle(mockRequest)).rejects.toThrow();
  });
});
