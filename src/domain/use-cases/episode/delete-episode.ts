export interface DeleteEpisode {
  delete(id: string): Promise<void>;
}
