import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';
import { AddAccount } from '../../../../domain/use-cases/add-account';
import { FieldComparer } from '../../../protocols/field-comparer';
import { badRequestError } from '../../../../shared/errors';

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly fieldComparer: FieldComparer
  ) {
    this.addAccount = addAccount;
    this.fieldComparer = fieldComparer;
  }

  async handle(request: SignUpController.Params): Promise<HttpResponse> {
    try {
      const isEqual = this.fieldComparer.compare(request);
      if (!isEqual)
        throw new badRequestError(
          `${this.fieldComparer.fieldToCompare} does not match ${this.fieldComparer.field}`
        );

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
