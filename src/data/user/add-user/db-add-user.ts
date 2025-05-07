import { AddUser } from '../../../domain/use-cases/user/add-user';
import { UnprocessableEntityError } from '../../../shared/errors';
import { AddUserRepository } from '../../protocols/user/add-user-repository';
import { LoadUserByEmailRepository } from '../../protocols/user/load-user-by-email-repository';
import { Hasher } from '../../protocols/cryptography/hasher';

export class DbAddUser implements AddUser {
  constructor(
    private readonly hasher: Hasher,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly addUserRepository: AddUserRepository
  ) {
    this.hasher = hasher;
    this.loadUserByEmailRepository = loadUserByEmailRepository;
    this.addUserRepository = addUserRepository;
  }
  async add(data: AddUser.Params): Promise<void> {
    const { name, email, password } = data;
    const user = await this.loadUserByEmailRepository.loadByEmail(email);
    if (user)
      throw new UnprocessableEntityError(
        'There is an user with this email already'
      );

    const hashedPassword = await this.hasher.hash(password);

    await this.addUserRepository.add({
      name,
      email,
      password: hashedPassword,
    });
  }
}
