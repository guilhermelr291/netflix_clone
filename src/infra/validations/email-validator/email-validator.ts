import { EmailValidator } from '../../../domain/protocols/email-validator';
import validator from 'validator';

export class EmailValidatorImpl implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
