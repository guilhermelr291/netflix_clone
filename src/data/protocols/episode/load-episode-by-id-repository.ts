import { Episode } from '../../../domain/models/episode';

export interface LoadEpisodeByIdRepository {
  loadById(id: string): Promise<Episode | null>;
}
