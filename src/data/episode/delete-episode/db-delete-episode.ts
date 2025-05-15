import { DeleteEpisode } from '../../../domain/use-cases/episode/delete-episode';
import { NotFoundError } from '../../../shared/errors';
import { DeleteEpisodeRepository } from '../../protocols/episode/delete-episode-repository';
import { LoadEpisodeByIdRepository } from '../../protocols/episode/load-episode-by-id-repository';

export class DbDeleteEpisode implements DeleteEpisode {
  constructor(
    private readonly deleteEpisodeRepository: DeleteEpisodeRepository,
    private readonly loadEpisodeByIdRepository: LoadEpisodeByIdRepository
  ) {}
  async delete(id: number): Promise<void> {
    const episode = await this.loadEpisodeByIdRepository.loadById(id);
    if (!episode) {
      throw new NotFoundError('Episode not found');
    }

    await this.deleteEpisodeRepository.delete(id);
  }
}
