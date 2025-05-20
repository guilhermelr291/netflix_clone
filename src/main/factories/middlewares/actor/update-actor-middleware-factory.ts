import { z } from 'zod';
import { ValidateData } from '../../../../presentation/middlewares/validation-middleware';
export const makeUpdateActorDataValidationMiddleware = (): ValidateData => {
  const updateActorSchema = z.object({
    fullName: z.string().optional(),
    imageUrl: z.string().url('imageUrl must be a valid URL').optional(),
    bio: z.string().optional(),
  });

  return new ValidateData(updateActorSchema);
};
