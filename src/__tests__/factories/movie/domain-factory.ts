import { Movie } from '../../../domain/models/movie';
import { AddMovie } from '../../../domain/use-cases/movie/add-movie';
import { DeleteMovie } from '../../../domain/use-cases/movie/delete-movie';
import { LoadMovieById } from '../../../domain/use-cases/movie/load-movie-by-id';
import { LoadMovies } from '../../../domain/use-cases/movie/load-movies';
import { mockMovie, mockMoviesModel } from './movie-factory';

export const makeAddMovie = (): AddMovie => {
  class AddMovieStub implements AddMovie {
    async add(data: AddMovie.Params): Promise<Movie> {
      return new Promise(resolve => resolve(mockMovie()));
    }
  }

  return new AddMovieStub();
};

export const makeDeleteMovie = (): DeleteMovie => {
  class DeleteMovieStub implements DeleteMovie {
    async delete(id: number): Promise<void> {}
  }

  return new DeleteMovieStub();
};

export const makeLoadMovieById = (): LoadMovieById => {
  class LoadMovieByIdStub implements LoadMovieById {
    async loadById(id: number): Promise<any> {
      return mockMovie();
    }
  }

  return new LoadMovieByIdStub();
};

export const makeLoadMovies = (): LoadMovies => {
  class LoadMoviesStub implements LoadMovies {
    async loadAll(): Promise<any[]> {
      return mockMoviesModel();
    }
  }

  return new LoadMoviesStub();
};
