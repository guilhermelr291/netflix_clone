import { Movie } from '../../../../generated/prisma';
import { AddMovieRepository } from '../../../data/protocols/movie/add-movie-repository';
import { DeleteMovieRepository } from '../../../data/protocols/movie/delete-movie-repository';
import { LoadMovieByIdRepository } from '../../../data/protocols/movie/load-movie-by-id-repository';
import { LoadMovieByTitleRepository } from '../../../data/protocols/movie/load-movie-by-title-repository';
import { AddMovie } from '../../../domain/use-cases/movie/add-movie';
import { mockMovie } from './movie-factory';

export const makeLoadMovieByIdRepository = () => {
  class LoadMovieByIdRepositoryStub implements LoadMovieByIdRepository {
    loadById(id: number): Promise<Movie | null> {
      return new Promise(resolve => resolve(mockMovie()));
    }
  }

  return new LoadMovieByIdRepositoryStub();
};

export const makeLoadMovieByTitleRepository =
  (): LoadMovieByTitleRepository => {
    class LoadMovieByTitleRepositoryStub implements LoadMovieByTitleRepository {
      async loadByTitle(title: string): Promise<Movie | null> {
        return new Promise(resolve => resolve(null));
      }
    }

    return new LoadMovieByTitleRepositoryStub();
  };

export const makeAddMovieByRepository = (): AddMovieRepository => {
  class AddMovieRepositoryStub implements AddMovieRepository {
    async add(data: AddMovie.Params): Promise<Movie> {
      return new Promise(resolve => resolve(mockMovie()));
    }
  }

  return new AddMovieRepositoryStub();
};

export const makeDeleteMovieRepository = () => {
  class DeleteMovieRepositoryStub implements DeleteMovieRepository {
    async deleteById(id: number): Promise<void> {}
  }
  return new DeleteMovieRepositoryStub();
};
