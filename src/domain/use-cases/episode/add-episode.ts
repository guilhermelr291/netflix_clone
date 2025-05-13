import { Episode } from '../../models/episode';

export interface AddEpisode {
  add: (data: AddEpisode.Params) => Promise<Episode>;
}

export namespace AddEpisode {
  export type Params = {
    title: string;
    description?: string;
    episodeNumber: number;
    previewUrl: string;
    url: string;
    thumbnailUrl: string;
    durationInMinutes: number;
    releaseDate: Date;
    movieId: number;
  };
}
