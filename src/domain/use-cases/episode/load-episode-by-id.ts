import { Episode } from '../../models/episode';

export interface LoadEpisodeById {
  load(id: string): Promise<Episode | null>;
}
