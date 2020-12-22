import express, { Request, Response } from 'express';

const routes = express.Router();

routes.get('/', (request: Request, response: Response) => {
  return response.send('Proffy API on!');
});

export { routes };
