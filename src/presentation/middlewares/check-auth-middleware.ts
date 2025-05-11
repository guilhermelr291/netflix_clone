import { LoadUserByToken } from '../../domain/use-cases/user/load-user-by-token';
import { UnauthorizedError } from '../../shared/errors';
import { ok } from '../helpers/http-helper';

import { HttpResponse } from '../protocols/http';
import { Middleware } from '../protocols/middleware';

export class CheckAuth implements Middleware {
  constructor(
    private readonly LoadUserByToken: LoadUserByToken,
    private readonly role?: string
  ) {}
  async handle(request: CheckAuth.Params): Promise<HttpResponse> {
    try {
      const headers = request.headers;

      const token = headers?.authorization?.split(' ')[1];
      if (!token) throw new UnauthorizedError('Token not provided');

      const user = await this.LoadUserByToken.loadByToken(token, this.role);
      if (!user) throw new UnauthorizedError();

      return ok({ userId: user?.id });
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
