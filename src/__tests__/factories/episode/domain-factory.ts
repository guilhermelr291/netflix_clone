import { Episode } from '../../../domain/models/episode';
import { AddEpisode } from '../../../domain/use-cases/episode/add-episode';
import { mockEpisode } from './models-factory';

export const makeAddEpisodeStub = (): AddEpisode => {
  class AddEpisodeStub implements AddEpisode {
    async add(data: AddEpisode.Params): Promise<Episode> {
      return new Promise(resolve => resolve(mockEpisode()));
    }
  }
  return new AddEpisodeStub();
};
