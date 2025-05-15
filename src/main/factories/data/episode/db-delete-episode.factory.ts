import { DbDeleteEpisode } from '../../../../data/episode/delete-episode/db-delete-episode';
import { makeEpisodeRepository } from '../../infra/episode-repository-factory';

export const makeDbDeleteEpisode = (): DbDeleteEpisode => {
  const episodeRepository = makeEpisodeRepository();
  return new DbDeleteEpisode(episodeRepository, episodeRepository);
};
