import { DeleteEpisode } from '../../../domain/use-cases/episode/delete-episode';
import { DeleteEpisodeRepository } from '../../protocols/episode/delete-episode-repository';

export class DbDeleteEpisode implements DeleteEpisode {
  constructor(
    private readonly deleteEpisodeRepository: DeleteEpisodeRepository
  ) {}
  async delete(id: number): Promise<void> {
    await this.deleteEpisodeRepository.delete(id);
  }
}
