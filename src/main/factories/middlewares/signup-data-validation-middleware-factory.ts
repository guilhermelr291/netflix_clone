import { z } from 'zod';
import { ValidateData } from '../../../presentation/middlewares/validation-middleware';

export const makeSignUpDataValidationMiddleware = (): ValidateData => {
  const signUpSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    passwordConfirmation: z
      .string()
      .min(6, 'Password confirmation must be at least 6 characters long'),
  });

  return new ValidateData(signUpSchema);
};
