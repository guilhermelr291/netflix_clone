import { describe, test, vi, expect } from 'vitest';
import { DbAddEpisode } from './db-add-episode';
import { AddEpisodeRepository } from '../../protocols/episode/add-episode-repository';
import { Episode } from '../../../domain/models/episode';
import { AddEpisode } from '../../../domain/use-cases/episode/add-episode';
import { makeLoadMovieByIdRepository } from '../../../__tests__/factories/movie/infra-factory';

const mockEpisode = (): Episode => ({
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
});

const makeAddEpisodeRepository = () => {
  class AddEpisodeRepositoryStub implements AddEpisodeRepository {
    async add(data: AddEpisode.Params): Promise<Episode> {
      return new Promise(resolve => resolve(mockEpisode()));
    }
  }

  return new AddEpisodeRepositoryStub();
};

const makeSut = (): DbAddEpisode => {
  const AddEpisodeRepositoryStub = makeAddEpisodeRepository();

  const sut = new DbAddEpisode(
    AddEpisodeRepositoryStub,
    makeLoadMovieByIdRepository()
  );

  return sut;
};
