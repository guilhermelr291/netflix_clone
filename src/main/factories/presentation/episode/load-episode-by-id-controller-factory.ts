import { LoadEpisodeByIdController } from '../../../../presentation/controllers/episode/load-episode-by-id/load-episode-by-id-controller';

import { makeDbLoadEpisodeById } from '../../data/episode/db-load-episode-by-id-factory';

export const makeLoadEpisodeByIdController = (): LoadEpisodeByIdController => {
  return new LoadEpisodeByIdController(makeDbLoadEpisodeById());
};
