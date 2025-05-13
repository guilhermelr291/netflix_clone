import { describe, test, vi, expect } from 'vitest';
import { DbAddEpisode } from './db-add-episode';
import { AddEpisodeRepository } from '../../protocols/episode/add-episode-repository';
import { Episode } from '../../../domain/models/episode';
import { AddEpisode } from '../../../domain/use-cases/episode/add-episode';
import { LoadMovieByIdRepository } from '../../protocols/movie/load-movie-by-id-repository';
import { Movie } from '../../../domain/models/movie';

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

const mockMovie = (): Movie => ({
  id: 1,
  title: 'Fake Movie',
  previewUrl: 'http://example.com/preview',
  thumbnailUrl: 'http://example.com/thumbnail',
  description: 'This is a fake movie description.',
  rating: 4.5,
  releaseYear: 2023,
  durationInMinutes: 120,
});

const makeAddEpisodeRepository = () => {
  class AddEpisodeRepositoryStub implements AddEpisodeRepository {
    async add(data: AddEpisode.Params): Promise<Episode> {
      return new Promise(resolve => resolve(mockEpisode()));
    }
  }

  return new AddEpisodeRepositoryStub();
};

const makeLoadMovieByIdRepository = () => {
  class LoadMovieByIdRepositoryStub implements LoadMovieByIdRepository {
    loadById(id: number): Promise<Movie | null> {
      return new Promise(resolve => resolve(mockMovie()));
    }
  }

  return new LoadMovieByIdRepositoryStub();
};

const makeSut = (): DbAddEpisode => {
  const AddEpisodeRepositoryStub = makeAddEpisodeRepository();

  const sut = new DbAddEpisode(
    AddEpisodeRepositoryStub,
    makeLoadMovieByIdRepository()
  );

  return sut;
};
