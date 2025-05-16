export interface DeleteEpisodeRepository {
  delete(id: string): Promise<void>;
}
