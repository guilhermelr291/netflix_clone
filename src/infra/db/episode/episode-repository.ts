import prisma from '../../../../prisma/db';
import { AddEpisodeRepository } from '../../../data/protocols/episode/add-episode-repository';
import { Episode } from '../../../domain/models/episode';
import { AddEpisode } from '../../../domain/use-cases/episode/add-episode';
import { EpisodeMapper } from '../protocols/episode-mapper';

export class EpisodeRepository implements AddEpisodeRepository {
  constructor(private readonly episodeMapper: EpisodeMapper) {}
  async add(data: AddEpisode.Params): Promise<Episode> {
    const persistenceData = this.episodeMapper.toPersistence(data);

    const episode = await prisma.episode.create({
      data: persistenceData,
    });

    return this.episodeMapper.toDomain(episode);
  }
}
