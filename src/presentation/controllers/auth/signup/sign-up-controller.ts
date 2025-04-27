import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';
import { AddAccount } from '../../../../domain/use-cases/account/add-account';
import { FieldComparer } from '../../../protocols/field-comparer';
import { BadRequestError } from '../../../../shared/errors';

import { created } from '../../../helpers/http-helper';

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly fieldComparer: FieldComparer
  ) {}

  async handle(request: SignUpController.Params): Promise<HttpResponse> {
    try {
      const isEqual = this.fieldComparer.compare(request);
      if (!isEqual)
        throw new BadRequestError(
          `${this.fieldComparer.fieldToCompare} does not match ${this.fieldComparer.field}`
        );

      //TODO: configurar lint de commits

      const { name, email, password } = request;

      await this.addAccount.add({ name, email, password });

      return created({ message: 'Account created successfully!' });
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
