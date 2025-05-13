import { Episode } from '../../../domain/models/episode';
import { AddEpisode } from '../../../domain/use-cases/episode/add-episode';
import { NotFoundError } from '../../../shared/errors';
import { AddEpisodeRepository } from '../../protocols/episode/add-episode-repository';
import { LoadMovieByIdRepository } from '../../protocols/movie/load-movie-by-id-repository';

export class DbAddEpisode implements AddEpisode {
  constructor(
    private readonly addEpisodeRepository: AddEpisodeRepository,
    private readonly loadMovieByIdRepository: LoadMovieByIdRepository
  ) {}

  async add(data: AddEpisode.Params): Promise<Episode> {
    const { movieId } = data;

    const movie = await this.loadMovieByIdRepository.loadById(movieId);

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    const episode = await this.addEpisodeRepository.add(data);
    return episode;
  }
}
