import { DeleteMovie } from '../../../domain/use-cases/movie/delete-movie';
import { DeleteMovieRepository } from '../../protocols/movie/delete-movie-repository';

export class DbDeleteMovie implements DeleteMovie {
  constructor(private readonly deleteMovieRepository: DeleteMovieRepository) {}

  async delete(id: number): Promise<void> {
    await this.deleteMovieRepository.deleteById(id);
  }
}
