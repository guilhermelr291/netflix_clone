import { describe, test, expect, vi, beforeAll, afterAll } from 'vitest';
import { EpisodeRepository } from './episode-repository';
import { EpisodeMapper } from '../protocols/episode-mapper';
import { Episode as PrismaEpisodeModel } from '../../../../generated/prisma';
import { Episode } from '../../../domain/models/episode';
import { AddEpisode } from '../../../domain/use-cases/episode/add-episode';
import { mockEpisode } from '../../../__tests__/factories/episode/models-factory';
import { mockAddEpisodeParams } from '../../../__tests__/factories/episode/requested-params-factory';
import prisma from '../../../../prisma/db';
import mockDate from 'mockdate';

vi.mock('../../../../prisma/db', () => ({
  default: {
    episode: {
      create: vi.fn().mockResolvedValue({
        id: 1,
        title: 'any_title',
        description: 'any_description',
        episodeNumber: 1,
        previewUrl: 'any_preview_url',
        url: 'any_url',
        thumbnailUrl: 'any_thumbnail_url',
        durationInMinutes: 1,
        releaseDate: new Date(),
        movieId: 1,
      }),
      delete: vi.fn(),
      findUnique: vi.fn().mockResolvedValue({
        id: 1,
        title: 'any_title',
        description: 'any_description',
        episodeNumber: 1,
        previewUrl: 'any_preview_url',
        url: 'any_url',
        thumbnailUrl: 'any_thumbnail_url',
        durationInMinutes: 1,
        releaseDate: new Date(),
        movieId: 1,
      }),
    },
  },
}));

const makeEpisodeMapper = (): EpisodeMapper => {
  class EpisodeMapperStub implements EpisodeMapper {
    toDomain(prismaEpisode: PrismaEpisodeModel): Episode {
      return mockEpisode();
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
        movieId: domainEpisode.movieId,
      };
    }
  }

  return new EpisodeMapperStub();
};

type SutTypes = {
  sut: EpisodeRepository;
  episodeMapperStub: EpisodeMapper;
};

const makeSut = (): SutTypes => {
  const episodeMapperStub = makeEpisodeMapper();
  const sut = new EpisodeRepository(episodeMapperStub);

  return {
    sut,
    episodeMapperStub,
  };
};

describe('EpisodeRepository', () => {
  beforeAll(() => {
    mockDate.set('2025-05-01');
  });
  afterAll(() => {
    mockDate.reset();
  });

  describe('add', () => {
    test('should call EpisodeMapper.toPersistence with correct values', async () => {
      const { sut, episodeMapperStub } = makeSut();
      const episodeData = mockAddEpisodeParams();
      const toPersistenceSpy = vi.spyOn(episodeMapperStub, 'toPersistence');
      await sut.add(episodeData);
      expect(toPersistenceSpy).toHaveBeenCalledWith(episodeData);
    });
    test('should call prisma.episode.create with correct values', async () => {
      const { sut } = makeSut();
      const episodeData = mockAddEpisodeParams();
      await sut.add(episodeData);
      expect(prisma.episode.create).toHaveBeenCalledWith({
        data: {
          title: episodeData.title,
          description: episodeData.description ?? null,
          episodeNumber: episodeData.episodeNumber,
          previewUrl: episodeData.previewUrl,
          url: episodeData.url,
          thumbnailUrl: episodeData.thumbnailUrl,
          durationInMinutes: episodeData.durationInMinutes,
          releaseDate: episodeData.releaseDate,
          movieId: episodeData.movieId,
        },
      });
    });
    test('should return an episode on success', async () => {
      const { sut } = makeSut();
      const episodeData = mockAddEpisodeParams();
      const episode = await sut.add(episodeData);
      expect(episode).toEqual(mockEpisode());
    });
    test('should throw if prisma.episode.create throws', async () => {
      const { sut } = makeSut();
      vi.spyOn(prisma.episode, 'create').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.add(mockAddEpisodeParams())).rejects.toThrow();
    });
  });

  describe('delete', () => {
    test('should call prisma.episode.delete with correct id', async () => {
      const { sut } = makeSut();
      await sut.delete(1);
      expect(prisma.episode.delete).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
    });
    test('should throw if prisma.episode.delete throws', async () => {
      const { sut } = makeSut();
      vi.spyOn(prisma.episode, 'delete').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.delete(1)).rejects.toThrow();
    });
  });

  describe('loadById', () => {
    test('should call prisma.episode.findUnique with correct id', async () => {
      const { sut } = makeSut();
      await sut.loadById(1);
      expect(prisma.episode.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
    });
    test('should return null if prisma.episode.findUnique returns null', async () => {
      const { sut } = makeSut();
      vi.spyOn(prisma.episode, 'findUnique').mockResolvedValueOnce(null);
      const episode = await sut.loadById(1);
      expect(episode).toBeNull();
    });
    test('should return an episode on success', async () => {
      const { sut } = makeSut();
      const episode = await sut.loadById(1);
      expect(episode).toEqual(mockEpisode());
    });
    test('should throw if prisma.episode.findUnique throws', async () => {
      const { sut } = makeSut();
      vi.spyOn(prisma.episode, 'findUnique').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.loadById(1)).rejects.toThrow();
    });
  });
});
