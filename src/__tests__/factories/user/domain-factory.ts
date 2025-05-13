import { AddUser } from '../../../domain/use-cases/user/add-user';
import { Authentication } from '../../../domain/use-cases/user/authentication';
import { mockAuthenticationResult } from './models-factory';

export const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    auth(data: Authentication.Params): Promise<Authentication.Result> {
      return new Promise(resolve => resolve(mockAuthenticationResult()));
    }
  }

  return new AuthenticationStub();
};

export const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add(data: AddUser.Params): Promise<void> {}
  }

  return new AddUserStub();
};
