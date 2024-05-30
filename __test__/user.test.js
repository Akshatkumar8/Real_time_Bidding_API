const request = require('supertest');
const app = require('../app');
const db = require('../config/db');
const User = require('../models/user');

describe('User Routes', () => {
  beforeAll(async () => {
    await db.sync({ force: true }); // Recreate the database
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({ username: 'testuser', password: 'testpassword', email: 'test@example.com' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should log in an existing user', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({ email: 'test@example.com', password: 'testpassword' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should get user profile', async () => {
    const loginRes = await request(app)
      .post('/users/login')
      .send({ email: 'test@example.com', password: 'testpassword' });

    const token = loginRes.body.token;

    const res = await request(app)
      .get('/users/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'testuser');
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });
});
