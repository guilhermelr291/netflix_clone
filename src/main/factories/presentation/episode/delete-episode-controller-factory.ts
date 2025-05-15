import { DeleteEpisodeController } from '../../../../presentation/controllers/episode/delete-episode/delete-episode-controller';
import { makeDbDeleteEpisode } from '../../data/episode/db-delete-episode.factory';

export const makeDeleteEpisodeController = (): DeleteEpisodeController => {
  return new DeleteEpisodeController(makeDbDeleteEpisode());
};
