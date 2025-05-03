import { AddMovieRepository } from '../../../data/protocols/movie/add-movie-repository';
import { LoadMovieByTitleRepository } from '../../../data/protocols/movie/load-movie-by-title-repository';
import { Movie } from '../../../domain/models/movie';

export class MovieRepository implements LoadMovieByTitleRepository {
  async loadByTitle(title: string): Promise<Movie | null> {}
}
