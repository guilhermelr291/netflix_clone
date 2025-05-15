import { z } from 'zod';
import { ValidateData } from '../../../../presentation/middlewares/validation-middleware';

export const makeAddMovieDataValidationMiddleware = (): ValidateData => {
  const addMovieSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    previewUrl: z.string().url('Invalid URL format for previewUrl'),
    thumbnailUrl: z.string().url('Invalid URL format for thumbnailUrl'),
    description: z.string().min(1, 'Description is required'),
    rating: z.number().min(0, 'Rating must be a positive number'),
    releaseYear: z.number().int('Release year must be an integer'),
    durationInMinutes: z.number().int('Duration must be an integer'),
  });

  return new ValidateData(addMovieSchema);
};
