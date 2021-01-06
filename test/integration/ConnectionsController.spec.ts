import supertest from 'supertest';

import { app } from '../../src/app';
import { connection } from '../../src/database/connection';

describe('ConnectionsController', () => {
  const proffy = {
    name: 'Alexandre Monteiro',
    avatar:
      'https://avatars0.githubusercontent.com/u/54924880?s=400&u=72d99d0c0ae092cc61a64c94a99a86fd7c4bf719&v=4',
    whatsapp: '11999999999',
    bio:
      'Javascript Developer - Typescript, AngularJs, React, React Native and NodeJs. Enthusiastic about new technologies. Computer Engineering Student.',
    subject: 'Programming',
    cost: 100,
    schedule: [
      { week_day: 1, from: '8:00', to: '12:00' },
      { week_day: 2, from: '8:00', to: '12:00' },
      { week_day: 3, from: '8:00', to: '12:00' },
    ],
  };

  const createNewClass = async (): Promise<supertest.Response> =>
    supertest(app).post('/classes').send(proffy);

  let user_id: any;

  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();

    await connection('users').truncate();
    await connection('classes').truncate();
    await connection('class_schedule').truncate();

    user_id = await createNewClass();
  });

  beforeEach(async () => {
    await connection('connections').truncate();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new connection', async () => {
    const response = await supertest(app)
      .post('/connections')
      .send({ user_id });

    expect(response.status).toBe(201);
  });

  it('should return error when not send user_id in request to create a new connection', async () => {
    const response = await supertest(app)
      .post('/connections')
      .send({ wrong_parameter: 145646 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should be able to list the total of connections', async () => {
    await supertest(app).post('/connections').send({ user_id });

    await supertest(app).post('/connections').send({ user_id });

    await supertest(app).post('/connections').send({ user_id });

    const response = await supertest(app).get('/connections');

    expect(response.body.total).toBe(3);
  });
});
