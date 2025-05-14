import { describe, test, expect, vi } from 'vitest';
import { AddEpisodeController } from './add-episode-controller';
import { AddEpisode } from '../../../../domain/use-cases/episode/add-episode';
import { Episode } from '../../../../domain/models/episode';
import { mockEpisode } from '../../../../__tests__/factories/episode/models-factory';
import { mockAddEpisodeParams } from '../../../../__tests__/factories/episode/requested-params-factory';
import { created } from '../../../helpers/http-helper';

type SutTypes = {
  sut: AddEpisodeController;
  addEpisodeStub: AddEpisode;
};

const makeAddEpisodeStub = (): AddEpisode => {
  class AddEpisodeStub implements AddEpisode {
    async add(data: AddEpisode.Params): Promise<Episode> {
      return new Promise(resolve => resolve(mockEpisode()));
    }
  }
  return new AddEpisodeStub();
};

const makeSut = (): SutTypes => {
  const addEpisodeStub = makeAddEpisodeStub();
  const sut = new AddEpisodeController(addEpisodeStub);
  return { sut, addEpisodeStub };
};

describe('AddEpisodeController', () => {
  test('should call AddEpisode with correct values', async () => {
    const { sut, addEpisodeStub } = makeSut();
    const addSpy = vi.spyOn(addEpisodeStub, 'add');
    const request = mockAddEpisodeParams();
    await sut.handle(request);
    expect(addSpy).toHaveBeenCalledWith(request);
  });
  test('should return 201 and episode on success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(mockAddEpisodeParams());
    expect(response).toEqual(created(mockEpisode()));
  });
  test('should throw if AddEpisode throws', async () => {
    const { sut, addEpisodeStub } = makeSut();
    vi.spyOn(addEpisodeStub, 'add').mockRejectedValueOnce(new Error());
    await expect(sut.handle(mockAddEpisodeParams())).rejects.toThrow();
  });
});
