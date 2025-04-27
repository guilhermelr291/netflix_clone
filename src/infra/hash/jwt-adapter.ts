import { Encrypter } from '../../data/protocols/encrypter';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export class JwtAdapter implements Encrypter {
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
}
