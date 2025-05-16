import { number } from 'zod';
import prisma from '../../../../prisma/db';
import { AddEpisodeRepository } from '../../../data/protocols/episode/add-episode-repository';
import { DeleteEpisodeRepository } from '../../../data/protocols/episode/delete-episode-repository';
import { LoadEpisodeByIdRepository } from '../../../data/protocols/episode/load-episode-by-id-repository';
import { Episode } from '../../../domain/models/episode';
import { AddEpisode } from '../../../domain/use-cases/episode/add-episode';
import { EpisodeMapper } from '../protocols/episode-mapper';

export class EpisodeRepository
  implements
    AddEpisodeRepository,
    DeleteEpisodeRepository,
    LoadEpisodeByIdRepository
{
  constructor(private readonly episodeMapper: EpisodeMapper) {}
  async add(data: AddEpisode.Params): Promise<Episode> {
    const persistenceData = this.episodeMapper.toPersistence(data);

    const episode = await prisma.episode.create({
      data: persistenceData,
    });

    return this.episodeMapper.toDomain(episode);
  }

  async delete(id: string): Promise<void> {
    await prisma.episode.delete({
      where: {
        id: Number(id),
      },
    });
  }

  async loadById(id: string): Promise<Episode | null> {
    const episode = await prisma.episode.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!episode) {
      return null;
    }

    return this.episodeMapper.toDomain(episode);
  }
}
