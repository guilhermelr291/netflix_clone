import prisma from '../../../../prisma/db';
import { AddMovieRepository } from '../../../data/protocols/movie/add-movie-repository';
import { DeleteMovieRepository } from '../../../data/protocols/movie/delete-movie-repository';
import { LoadMovieByIdRepository } from '../../../data/protocols/movie/load-movie-by-id-repository';
import { LoadMovieByTitleRepository } from '../../../data/protocols/movie/load-movie-by-title-repository';
import { LoadMoviesRepository } from '../../../data/protocols/movie/load-movies-repository';
import { Movie } from '../../../domain/models/movie';
import { AddMovie } from '../../../domain/use-cases/movie/add-movie';

export class MovieRepository
  implements
    LoadMovieByTitleRepository,
    AddMovieRepository,
    DeleteMovieRepository,
    LoadMovieByIdRepository,
    LoadMoviesRepository
{
  async loadByTitle(title: string): Promise<Movie | null> {
    const movie = await prisma.movie.findUnique({ where: { title } });

    return movie;
  }
  async add(data: AddMovie.Params): Promise<Movie> {
    const movie = await prisma.movie.create({ data });

    return movie;
  }

  async deleteById(id: number): Promise<void> {
    await prisma.movie.delete({ where: { id } });
  }

  async loadById(id: number): Promise<Movie | null> {
    return await prisma.movie.findUnique({ where: { id } });
  }
  async loadAll(): Promise<Movie[]> {
    return await prisma.movie.findMany();
  }
}
