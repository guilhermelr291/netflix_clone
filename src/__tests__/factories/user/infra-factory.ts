import { AddUserRepository } from '../../../data/protocols/user/add-user-repository';
import { LoadUserByEmailRepository } from '../../../data/protocols/user/load-user-by-email-repository';
import { LoadUserByIdRepository } from '../../../data/protocols/user/load-user-by-id-repository';
import { UserModel } from '../../../domain/models/user';
import { AddUser } from '../../../domain/use-cases/user/add-user';
import { mockUser } from './models-factory';

export const makeLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    loadByEmail(email: string): Promise<UserModel | null> {
      return new Promise(resolve => resolve(mockUser()));
    }
  }

  return new LoadUserByEmailRepositoryStub();
};

export const makeAddUserRepository = (): AddUserRepository => {
  class AddUserRepositoryStub implements AddUserRepository {
    async add(data: AddUser.Params): Promise<void> {}
  }

  return new AddUserRepositoryStub();
};

export const makeLoadUserByIdRepository = (): LoadUserByIdRepository => {
  class LoadUserByIdRepositoryStub implements LoadUserByIdRepository {
    loadById(id: number): Promise<UserModel | null> {
      return new Promise(resolve => resolve(mockUser()));
    }
  }

  return new LoadUserByIdRepositoryStub();
};
