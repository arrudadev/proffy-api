import { Request, Response } from 'express';

import { connection } from '../database/connection';

export class ConnectionsController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.body;

      await connection('connections').insert({
        user_id,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({
        error: 'Unexpected error while creating new connection',
      });
    }
  }

  async index(request: Request, response: Response): Promise<Response> {
    const totalConnections = await connection('connections').count(
      '* as total',
    );

    const { total } = totalConnections[0];

    return response.json({ total });
  }
}
