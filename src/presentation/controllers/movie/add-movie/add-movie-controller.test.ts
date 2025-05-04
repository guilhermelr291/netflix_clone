import { vi, test, describe, expect } from 'vitest';
import { AddMovie } from '../../../../domain/use-cases/movie/add-movie';
import { Movie } from '../../../../domain/models/movie';
import { AddMovieController } from './add-movie-controller';

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

const mockAddMovieParams = (): Omit<Movie, 'id'> => ({
  title: 'Fake Movie',
  previewUrl: 'http://example.com/preview',
  thumbnailUrl: 'http://example.com/thumbnail',
  description: 'This is a fake movie description.',
  rating: 4.5,
  releaseYear: 2023,
  durationInMinutes: 120,
});

const makeAddMovie = (): AddMovie => {
  class AddMovieStub implements AddMovie {
    async add(data: AddMovie.Params): Promise<Movie> {
      return new Promise(resolve => resolve(mockMovie()));
    }
  }

  return new AddMovieStub();
};

type SutTypes = {
  sut: AddMovieController;
  addMovieStub: AddMovie;
};

const makeSut = (): SutTypes => {
  const addMovieStub = makeAddMovie();
  const sut = new AddMovieController(addMovieStub);

  return { sut, addMovieStub };
};

describe('AddMovieController', () => {
  test('should call addMovie with correct ', async () => {
    const { sut, addMovieStub } = makeSut();

    const addSpy = vi.spyOn(addMovieStub, 'add');

    const addMovieParams = mockAddMovieParams();

    await sut.handle(addMovieParams);

    expect(addSpy).toHaveBeenCalledWith(addMovieParams);
  });
});
