import { Encrypter } from '../../../data/protocols/cryptography/encrypter';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { Decrypter } from '../../../data/protocols/cryptography/decrypter';

dotenv.config();

export class JwtAdapter implements Encrypter, Decrypter {
  private readonly jwtSecret: string;
  constructor() {
    const SECRET = process.env.JWT_SECRET;
    if (!SECRET) {
      throw new Error('JwtSecret not found!');
    }

    this.jwtSecret = SECRET;
  }

  encrypt(value: string | number): string {
    return jwt.sign({ value }, this.jwtSecret);
  }
  decrypt(encryptedValue: string): any {
    return jwt.verify(encryptedValue, this.jwtSecret);
  }
}
