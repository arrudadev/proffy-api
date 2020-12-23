import express, { Request, Response } from 'express';

import { ClassesController } from './controllers/ClassesController';
import { ConnectionsController } from './controllers/ConnectionsController';

const routes = express.Router();

const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();

routes.get('/', (request: Request, response: Response) => {
  return response.send('Proffy API on!');
});

routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export { routes };
