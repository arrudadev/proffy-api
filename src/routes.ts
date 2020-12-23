import express, { Request, Response } from 'express';

import { ClassesController } from './controllers/ClassesController';

const routes = express.Router();

const classesControllers = new ClassesController();

routes.get('/', (request: Request, response: Response) => {
  return response.send('Proffy API on!');
});

routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.create);

export { routes };
