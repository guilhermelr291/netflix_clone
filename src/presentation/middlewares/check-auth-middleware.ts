import { LoadAccountByToken } from '../../domain/use-cases/account/load-account-by-token';
import { UnauthorizedError } from '../../shared/errors';
import { ok } from '../helpers/http-helper';

import { HttpResponse } from '../protocols/http';
import { Middleware } from '../protocols/middleware';

export class CheckAuth implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}
  async handle(request: CheckAuth.Params): Promise<HttpResponse> {
    try {
      const headers = request.headers;

      const token = headers?.authorization?.split(' ')[1];
      if (!token) throw new UnauthorizedError('Token not provided');

      const account = await this.loadAccountByToken.loadByToken(token);
      if (!account) throw new UnauthorizedError();

      return ok({ accountId: account?.id });
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new UnauthorizedError();
    }
  }
}

export namespace CheckAuth {
  export type Params = {
    headers: any;
  };
}
