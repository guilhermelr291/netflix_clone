import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';
import { AddUser } from '../../../../domain/use-cases/user/add-user';
import { FieldComparer } from '../../../protocols/field-comparer';
import { BadRequestError } from '../../../../shared/errors';

import { created } from '../../../helpers/http-helper';

export class SignUpController implements Controller {
  constructor(
    private readonly addUser: AddUser,
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

      await this.addUser.add({ name, email, password });

      return created({ message: 'User created successfully!' });
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
