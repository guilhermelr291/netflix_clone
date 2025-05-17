import { z } from 'zod';
import { ValidateData } from '../../../../presentation/middlewares/validation-middleware';
export const makeAddActorDataValidationMiddleware = (): ValidateData => {
  const addActorSchema = z.object({
    fullName: z.string().min(1, 'fullName is required'),
    imageUrl: z.string().url('imageUrl must be a valid URL').optional(),
    bio: z.string().optional(),
  });

  return new ValidateData(addActorSchema);
};
