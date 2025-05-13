import { Episode } from '../../../domain/models/episode';
import { AddEpisode } from '../../../domain/use-cases/episode/add-episode';

export interface AddEpisodeRepository {
  add(data: AddEpisode.Params): Promise<Episode>;
}
