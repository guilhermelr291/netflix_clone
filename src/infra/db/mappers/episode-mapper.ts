import { Episode as PrismaEpisodeModel } from '../../../../generated/prisma';
import { Episode } from '../../../domain/models/episode';
import { AddEpisode } from '../../../domain/use-cases/episode/add-episode';
import { EpisodeMapper } from '../protocols/episode-mapper';

export class EpisodeMapperImpl implements EpisodeMapper {
  toDomain(prismaEpisode: PrismaEpisodeModel): Episode {
    return {
      id: prismaEpisode.id,
      title: prismaEpisode.title,
      description: prismaEpisode.description ?? undefined,
      episodeNumber: prismaEpisode.episodeNumber,
      previewUrl: prismaEpisode.previewUrl,
      url: prismaEpisode.url,
      thumbnailUrl: prismaEpisode.thumbnailUrl,
      durationInMinutes: prismaEpisode.durationInMinutes,
      releaseDate: prismaEpisode.releaseDate,
      movieId: prismaEpisode.movieId,
    };
  }

  toPersistence(
    domainEpisode: AddEpisode.Params
  ): Omit<PrismaEpisodeModel, 'id'> {
    return {
      title: domainEpisode.title,
      description: domainEpisode.description ?? null,
      episodeNumber: domainEpisode.episodeNumber,
      previewUrl: domainEpisode.previewUrl,
      url: domainEpisode.url,
      thumbnailUrl: domainEpisode.thumbnailUrl,
      durationInMinutes: domainEpisode.durationInMinutes,
      releaseDate: domainEpisode.releaseDate,
      movieId: Number(domainEpisode.movieId),
    };
  }
}
