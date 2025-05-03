import prisma from '../../../../prisma/db';
import { AddMovieRepository } from '../../../data/protocols/movie/add-movie-repository';
import { LoadMovieByTitleRepository } from '../../../data/protocols/movie/load-movie-by-title-repository';
import { Movie } from '../../../domain/models/movie';
import { AddMovie } from '../../../domain/use-cases/movie/add-movie';

export class MovieRepository
  implements LoadMovieByTitleRepository, AddMovieRepository
{
  async loadByTitle(title: string): Promise<Movie | null> {
    const movie = await prisma.movie.findUnique({ where: { title } });

    return movie;
  }
  async add(data: AddMovie.Params): Promise<Movie> {
    const movie = await prisma.movie.create({ data });
  }
}
