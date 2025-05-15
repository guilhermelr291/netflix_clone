export interface DeleteEpisode {
  delete(id: number): Promise<void>;
}
