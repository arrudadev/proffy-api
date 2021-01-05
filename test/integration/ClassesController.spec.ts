import supertest from 'supertest';

import { app } from '../../src/app';
import { connection } from '../../src/database/connection';

describe('ClassesController', () => {
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

  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  beforeEach(async () => {
    await connection('users').truncate();
    await connection('classes').truncate();
    await connection('class_schedule').truncate();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create new class', async () => {
    const response = await createNewClass();

    expect(response.status).toBe(201);
  });

  it('should insert in users table while create a new class', async () => {
    const response = await createNewClass();

    const [user] = await connection('users')
      .where('name', proffy.name)
      .where('avatar', proffy.avatar)
      .where('whatsapp', proffy.whatsapp)
      .where('bio', proffy.bio)
      .select('*');

    expect(response.status).toBe(201);

    expect(user).toHaveProperty('id');
    expect(user.name).toBe(proffy.name);
    expect(user.avatar).toBe(proffy.avatar);
    expect(user.whatsapp).toBe(proffy.whatsapp);
    expect(user.bio).toBe(proffy.bio);
  });

  it('should insert in classes table while create a new class', async () => {
    const response = await createNewClass();

    const [user] = await connection('users')
      .where('name', proffy.name)
      .where('avatar', proffy.avatar)
      .where('whatsapp', proffy.whatsapp)
      .where('bio', proffy.bio)
      .select('*');

    const [userClass] = await connection('classes')
      .where('subject', proffy.subject)
      .where('cost', proffy.cost)
      .where('user_id', user.id)
      .select('*');

    expect(response.status).toBe(201);

    expect(userClass).toHaveProperty('id');
    expect(userClass.subject).toBe(proffy.subject);
    expect(userClass.cost).toBe(proffy.cost);
    expect(userClass.user_id).toBe(user.id);
  });

  it('should insert in class_schedule table while create a new class', async () => {
    const response = await createNewClass();

    const [user] = await connection('users')
      .where('name', proffy.name)
      .where('avatar', proffy.avatar)
      .where('whatsapp', proffy.whatsapp)
      .where('bio', proffy.bio)
      .select('*');

    const [userClass] = await connection('classes')
      .where('subject', proffy.subject)
      .where('cost', proffy.cost)
      .where('user_id', user.id)
      .select('*');

    const [
      class_schedule_week_day_1,
      class_schedule_week_day_2,
      class_schedule_week_day_3,
    ] = await connection('class_schedule')
      .where('class_id', userClass.id)
      .select('*')
      .orderBy('week_day');

    expect(response.status).toBe(201);

    expect(class_schedule_week_day_1).toHaveProperty('id');
    expect(class_schedule_week_day_1.week_day).toBe(1);
    expect(class_schedule_week_day_1.from).toBe(480);
    expect(class_schedule_week_day_1.to).toBe(720);

    expect(class_schedule_week_day_2).toHaveProperty('id');
    expect(class_schedule_week_day_2.week_day).toBe(2);
    expect(class_schedule_week_day_2.from).toBe(480);
    expect(class_schedule_week_day_2.to).toBe(720);

    expect(class_schedule_week_day_3).toHaveProperty('id');
    expect(class_schedule_week_day_3.week_day).toBe(3);
    expect(class_schedule_week_day_3.from).toBe(480);
    expect(class_schedule_week_day_3.to).toBe(720);
  });

  it('should be able to list classes that been in the filter', async () => {
    await createNewClass();

    const response = await supertest(app).get('/classes').query({
      subject: proffy.subject,
      week_day: proffy.schedule[0].week_day,
      time: proffy.schedule[0].from,
    });

    const classes = response.body;

    expect(classes[0]).toHaveProperty('name');
    expect(classes[0]).toHaveProperty('avatar');
    expect(classes[0]).toHaveProperty('whatsapp');
    expect(classes[0]).toHaveProperty('bio');
    expect(classes[0]).toHaveProperty('subject');
    expect(classes[0]).toHaveProperty('cost');
    expect(classes[0]).toHaveProperty('user_id');
    expect(classes[0]).toHaveProperty('id');
  });

  it('should return an error when the subject filter are missing', async () => {
    await createNewClass();

    const response = await supertest(app).get('/classes').query({
      week_day: proffy.schedule[0].week_day,
      time: proffy.schedule[0].from,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return an error when the week_day filter are missing', async () => {
    await createNewClass();

    const response = await supertest(app).get('/classes').query({
      subject: proffy.subject,
      time: proffy.schedule[0].from,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return an error when the time filter are missing', async () => {
    await createNewClass();

    const response = await supertest(app).get('/classes').query({
      subject: proffy.subject,
      week_day: proffy.schedule[0].week_day,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
