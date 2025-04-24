import { Request, Response } from 'express';
import { Controller } from '../../presentation/protocols/controller';
import { HttpError } from '../../shared/errors';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    try {
      const requestData = { ...req.params, ...req.body, ...req.query };
      const result = await controller.handle(requestData);

      res.status(result.status).json(result.body);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
