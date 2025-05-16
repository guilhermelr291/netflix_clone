import { Episode } from '../../../domain/models/episode';
import { LoadEpisodeById } from '../../../domain/use-cases/episode/load-episode-by-id';
import { NotFoundError } from '../../../shared/errors';
import { LoadEpisodeByIdRepository } from '../../protocols/episode/load-episode-by-id-repository';

export class DbLoadEpisodeById implements LoadEpisodeById {
  constructor(
    private readonly loadEpisodeByIdRepository: LoadEpisodeByIdRepository
  ) {}

  async load(id: string): Promise<Episode | null> {
    const episode = await this.loadEpisodeByIdRepository.loadById(id);

    if (!episode) {
      throw new NotFoundError('Episode not found');
    }

    return episode;
  }
}
