import { z } from 'zod';
import { ValidateData } from '../../../../presentation/middlewares/validation-middleware';

export const makeLoginDataValidationMiddleware = (): ValidateData => {
  const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  });

  return new ValidateData(loginSchema);
};
