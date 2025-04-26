import { UnprocessableEntityError } from '../../shared/errors';
import { ok } from '../helpers/http-helper';
import { HttpResponse } from '../protocols/http';
import { Middleware } from '../protocols/middleware';
import { Schema } from 'zod';

export class ValidateData implements Middleware {
  constructor(private readonly zodSchema: Schema) {}
  async handle(request: ValidateData.Params): Promise<HttpResponse> {
    const data = request.bodyContent;
    const validationResult = await this.zodSchema.safeParseAsync(data);

    if (!validationResult.success) {
      throw new UnprocessableEntityError(
        validationResult.error.errors.map(error => ({
          path: error.path,
          message: error.message,
        }))
      );
    }

    return ok(validationResult.data);
  }
}

export namespace ValidateData {
  export type Params = {
    bodyContent: any;
  };
}
