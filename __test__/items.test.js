const request = require('supertest');
const app = require('../app');
const db = require('../config/db');
const User = require('../models/user');
const Item = require('../models/item');

describe('Item Routes', () => {
  let token;
  let itemId;

  beforeAll(async () => {
    await db.sync({ force: true });

    // Create an admin user
    const user = await User.create({ username: 'admin', password: 'adminpassword', email: 'admin@example.com', role: 'admin' });
    const loginRes = await request(app)
      .post('/users/login')
      .send({ email: 'admin@example.com', password: 'adminpassword' });
    token = loginRes.body.token;
  });

  it('should create a new item', async () => {
    const res = await request(app)
      .post('/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Item 1',
        description: 'Description for item 1',
        starting_price: 100.0,
        end_time: new Date(Date.now() + 3600 * 1000).toISOString() // 1 hour from now
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('message', 'Item created successfully');
    itemId = res.body.id;
  });

  it('should retrieve all items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should retrieve a single item by ID', async () => {
    const res = await request(app).get(`/items/${itemId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Item 1');
  });

  it('should update an item', async () => {
    const res = await request(app)
      .put(`/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Item 1',
        description: 'Updated description for item 1'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Item updated successfully');
  });

  it('should delete an item', async () => {
    const res = await request(app)
      .delete(`/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Item deleted successfully');
  });
});
