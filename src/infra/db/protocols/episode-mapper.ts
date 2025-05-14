import { Episode as PrismaEpisodeModel } from '../../../../generated/prisma';
import { Episode } from '../../../domain/models/episode';
import { AddEpisode } from '../../../domain/use-cases/episode/add-episode';

export interface EpisodeMapper {
  toDomain(prismaEpisode: PrismaEpisodeModel): Episode;
  toPersistence(
    domainEpisode: AddEpisode.Params
  ): Omit<PrismaEpisodeModel, 'id'>;
}
