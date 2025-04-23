import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';
import { AddAccount } from '../../../../domain/use-cases/add-account';
import { FieldComparer } from '../../../protocols/field-comparer';
import { badRequestError } from '../../../../shared/errors';
import { EmailValidator } from '../../../../domain/protocols/email-validator';

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly fieldComparer: FieldComparer,
    private readonly emailValidator: EmailValidator
  ) {}

  async handle(request: SignUpController.Params): Promise<HttpResponse> {
    try {
      const isEqual = this.fieldComparer.compare(request);
      if (!isEqual)
        throw new badRequestError(
          `${this.fieldComparer.fieldToCompare} does not match ${this.fieldComparer.field}`
        );

      const isValidEmail = this.emailValidator.isValid(request.email); //TODO: fazer um composite para essas validações.
      if (!isValidEmail)
        throw new badRequestError('Please, provide a valid email');

      const { name, email, password } = request;

      await this.addAccount.add({ name, email, password });

      return new Promise(resolve => resolve({ status: 200 }));
    } catch (error) {
      console.log('Error on signUp: ', error);
      throw error;
    }
  }
}

export namespace SignUpController {
  export type Params = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}
