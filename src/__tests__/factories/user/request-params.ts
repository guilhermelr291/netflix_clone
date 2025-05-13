import { AddUser } from '../../../domain/use-cases/user/add-user';
import { Authentication } from '../../../domain/use-cases/user/authentication';

export const mockAddUserParams = (): AddUser.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockSignUpRequestParams = () => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password',
});
