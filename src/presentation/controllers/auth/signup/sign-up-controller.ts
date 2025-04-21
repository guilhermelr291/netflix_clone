import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';
import { AddAccount } from '../../../../domain/use-cases/add-account';

export class SignUpController implements Controller {
  constructor(private readonly addAccount: AddAccount) {
    this.addAccount = addAccount;
  }

  handle(request: SignUpController.Params): Promise<HttpResponse> {
    try {
    } catch (error) {}
  }
}

export namespace SignUpController {
  export type Params = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}
