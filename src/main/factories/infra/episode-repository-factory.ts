import { EpisodeRepository } from '../../../infra/db/episode/episode-repository';
import { EpisodeMapperImpl } from '../../../infra/db/mappers/episode-mapper';

export const makeEpisodeRepository = (): EpisodeRepository => {
  return new EpisodeRepository(new EpisodeMapperImpl());
};
