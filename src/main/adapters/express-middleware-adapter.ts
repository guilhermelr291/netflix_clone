import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../shared/errors';
import { Middleware } from '../../presentation/protocols/middleware';

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData = {
        headers: req.headers,
        body: req.body,
      };

      const result = await middleware.handle(requestData);

      const { userId } = result.body;

      if (result.status === 200) {
        if (!result.body.userId) req.body = result.body; //significa que n veio do checkAuthMiddleware. TODO: Preciso melhorar isso depois
        if (userId) req.userId = userId;
        next();
      }
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
