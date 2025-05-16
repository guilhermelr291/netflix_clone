import { DbLoadEpisodeById } from '../../../../data/episode/load-episode-by-id/db-load-episode-by-id';
import { makeEpisodeRepository } from '../../infra/episode-repository-factory';

export const makeDbLoadEpisodeById = (): DbLoadEpisodeById => {
  return new DbLoadEpisodeById(makeEpisodeRepository());
};
