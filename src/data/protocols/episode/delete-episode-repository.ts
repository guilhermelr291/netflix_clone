export interface DeleteEpisodeRepository {
  delete(id: number): Promise<void>;
}
