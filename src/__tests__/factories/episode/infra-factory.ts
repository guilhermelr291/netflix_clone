import { AddEpisodeRepository } from '../../../data/protocols/episode/add-episode-repository';
import { DeleteEpisodeRepository } from '../../../data/protocols/episode/delete-episode-repository';
import { Episode } from '../../../domain/models/episode';
import { AddEpisode } from '../../../domain/use-cases/episode/add-episode';
import { mockEpisode } from './models-factory';

export const makeAddEpisodeRepository = () => {
  class AddEpisodeRepositoryStub implements AddEpisodeRepository {
    async add(data: AddEpisode.Params): Promise<Episode> {
      return new Promise(resolve => resolve(mockEpisode()));
    }
  }

  return new AddEpisodeRepositoryStub();
};

export const makeDeleteEpisodeRepository = () => {
  class DeleteEpisodeRepositoryStub implements DeleteEpisodeRepository {
    async delete(id: number): Promise<void> {}
  }

  return new DeleteEpisodeRepositoryStub();
};
