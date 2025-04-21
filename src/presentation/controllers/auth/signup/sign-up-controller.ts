import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';
import { AddAccount } from '../../../../domain/use-cases/add-account';
import { FieldComparer } from '../../../protocols/field-comparer';

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly fieldComparer: FieldComparer
  ) {
    this.addAccount = addAccount;
    this.fieldComparer = fieldComparer;
  }

  handle(request: SignUpController.Params): Promise<HttpResponse> {
    try {
      const result = this.fieldComparer.compare(request);

      return new Promise(resolve => resolve({ status: 200 }));
    } catch (error) {
      console.log('Error in signUp: ', error);
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
