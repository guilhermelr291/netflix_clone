import { z } from 'zod';
import { DbAddAccount } from '../../data/account/add-account/db-add-account';
import { AccountRepository } from '../../infra/db/account/account-repository';
import { SignUpController } from '../../presentation/controllers/auth/signup/sign-up-controller';
import { ValidateData } from '../../presentation/middlewares/validation-middleware';
import { FieldComparerImpl } from '../../utils/validations/field-comparer';
import { makeHasher } from './hasher';

export const makeFieldComparer = (): FieldComparerImpl => {
  return new FieldComparerImpl('password', 'passwordConfirmation');
};

export const makeAccountRepository = (): AccountRepository => {
  return new AccountRepository();
};
export const makeAddAccount = (): DbAddAccount => {
  return new DbAddAccount(
    makeHasher(),
    makeAccountRepository(),
    makeAccountRepository()
  );
};
export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeAddAccount(), makeFieldComparer());
};

export const makeValidateDataMiddleware = (): ValidateData => {
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
