import { Express, Router } from 'express';
import path from 'path';
import { readdirSync } from 'fs';

export default (app: Express): void => {
  const router = Router();

  app.use('/api', router);
  const routesPath = path.join(__dirname, '/../routes');
  readdirSync(routesPath).map(async file => {
    if (!file.includes('.test.') && !file.includes('.map')) {
      console.log('importando: ', file);
      (await import(`../routes/${file}`)).default(router);
    }
  });
};
