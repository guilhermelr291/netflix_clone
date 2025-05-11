import { UserModel } from '../../../domain/models/user';
import { LoadUserByToken } from '../../../domain/use-cases/user/load-user-by-token';
import { LoadUserByIdRepository } from '../../protocols/user/load-user-by-id-repository';
import { Decrypter } from '../../protocols/cryptography/decrypter';

export class DbLoadUserByToken implements LoadUserByToken {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
    private readonly decrypter: Decrypter
  ) {}

  async loadByToken(token: string, role?: string): Promise<UserModel | null> {
    const payload = this.decrypter.decrypt(token);

    const id = Number(payload.id);

    const user = await this.loadUserByIdRepository.loadById(id, role);

    return user;
  }
}
