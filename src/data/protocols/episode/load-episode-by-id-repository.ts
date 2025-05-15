import { Episode } from '../../../domain/models/episode';

export interface LoadEpisodeByIdRepository {
  loadById(id: number): Promise<Episode | null>;
}
