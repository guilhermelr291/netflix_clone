import { UnprocessableEntityError } from '../../shared/errors';
import { ok } from '../helpers/http-helper';
import { HttpResponse } from '../protocols/http';
import { Middleware } from '../protocols/middleware';
import { Schema } from 'zod';

export class ValidateData implements Middleware {
  constructor(private readonly zodSchema: Schema) {}
  async handle(request: ValidateData.Params): Promise<HttpResponse> {
    const data = request.body;
    const validationResult = await this.zodSchema.safeParseAsync(data);

    if (!validationResult.success) {
      const errorDetails = validationResult.error.errors
        .map(
          error =>
            `${error.path.join ? error.path.join('.') : error.path}: ${
              error.message
            }`
        )
        .join('; ');

      throw new UnprocessableEntityError(`Validation failed: ${errorDetails}`);
    }

    return ok(validationResult.data);
  }
}

export namespace ValidateData {
  export type Params = {
    body: any;
  };
}
