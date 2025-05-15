import { AddEpisodeController } from '../../../../presentation/controllers/episode/add-episode/add-episode-controller';
import { makeDbAddEpisode } from '../../data/episode/db-add-episode-factory';

export const makeAddEpisodeController = (): AddEpisodeController => {
  return new AddEpisodeController(makeDbAddEpisode());
};
