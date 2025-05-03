import prisma from '../../../../prisma/db';
import { LoadMovieByTitleRepository } from '../../../data/protocols/movie/load-movie-by-title-repository';
import { Movie } from '../../../domain/models/movie';

export class MovieRepository implements LoadMovieByTitleRepository {
  async loadByTitle(title: string): Promise<Movie | null> {
    const movie = await prisma.movie.findUnique({ where: { title } });
  }
}
