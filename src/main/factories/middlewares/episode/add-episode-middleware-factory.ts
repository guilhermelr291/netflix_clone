import { z } from 'zod';
import { ValidateData } from '../../../../presentation/middlewares/validation-middleware';
export const makeAddEpisodeDataValidationMiddleware = (): ValidateData => {
  const addEpisodeSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    episodeNumber: z
      .number()
      .int('Episode number must be an integer')
      .positive('Episode number must be positive'),
    previewUrl: z.string().url('Invalid URL format for previewUrl'),
    url: z.string().url('Invalid URL format for url'),
    thumbnailUrl: z.string().url('Invalid URL format for thumbnailUrl'),
    durationInMinutes: z
      .number()
      .int('Duration must be an integer')
      .positive('Duration must be positive'),
    releaseDate: z.preprocess(
      arg => {
        if (typeof arg === 'string' || arg instanceof Date) {
          const date = new Date(arg);
          return isNaN(date.getTime()) ? undefined : date;
        }
        return undefined;
      },
      z.date({
        required_error: 'Release date is required',
        invalid_type_error: 'Release date must be a valid date',
      })
    ),

    movieId: z
      .number()
      .int('Movie ID must be an integer')
      .positive('Movie ID must be positive'),
  });

  return new ValidateData(addEpisodeSchema);
};
