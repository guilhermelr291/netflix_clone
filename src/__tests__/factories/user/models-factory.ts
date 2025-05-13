import { UserModel } from '../../../domain/models/user';
import { Authentication } from '../../../domain/use-cases/user/authentication';

export const mockUser = (): UserModel => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  role: 'USER',
});

export const mockAuthenticationResult = (): Authentication.Result => ({
  accessToken: 'any_token',
  user: {
    name: 'any_name',
    email: 'any_email',
  },
});
