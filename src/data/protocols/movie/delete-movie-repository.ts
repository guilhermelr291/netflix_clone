export interface DeleteMovieRepository {
  deleteById(id: string): Promise<void>;
}
