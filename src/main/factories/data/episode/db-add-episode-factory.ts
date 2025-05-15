import { DbAddEpisode } from '../../../../data/episode/add-episode/db-add-episode';
import { makeMovieRepository } from '../../infra';
import { makeEpisodeRepository } from '../../infra/episode-repository-factory';

export const makeDbAddEpisode = (): DbAddEpisode => {
  return new DbAddEpisode(makeEpisodeRepository(), makeMovieRepository());
};
