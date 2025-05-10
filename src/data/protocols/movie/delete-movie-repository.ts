export interface DeleteMovieRepository {
  deleteById(id: number): Promise<void>;
}
