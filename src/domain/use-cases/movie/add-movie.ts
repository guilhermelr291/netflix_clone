import { Movie } from '../../models/movie';

export interface AddMovie {
  add(data: AddMovie.Params): Promise<Movie>;
}

export namespace AddMovie {
  export type Params = {
    title: string;
    previewUrl: string;
    thumbnailUrl: string;
    description: string;
    rating: number;
    releaseYear: number;
    durationInMinutes: number;
  };
}
