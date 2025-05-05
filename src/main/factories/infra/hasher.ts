import { BcryptAdapter } from '../../../infra/hash/bcrypt/bcrypt-adapter';

export const makeHasher = (): BcryptAdapter => {
  return new BcryptAdapter(10);
};
