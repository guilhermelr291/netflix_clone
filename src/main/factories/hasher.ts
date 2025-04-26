import { BcryptAdapter } from '../../infra/cryptography/bcrypt/bcrypt-adapter';

export const makeHasher = (): BcryptAdapter => {
  return new BcryptAdapter(10);
};
