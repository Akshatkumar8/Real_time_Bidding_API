const request = require('supertest');
const app = require('../app');
const db = require('../config/db');
const User = require('../models/user');
const Notification = require('../models/notification');

describe('Notification Routes', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await db.sync({ force: true });

    // Create a user
    const user = await User.create({ username: 'testuser', password: 'testpassword', email: 'test@example.com' });
    userId = user.id;
    const loginRes = await request(app)
      .post('/users/login')
      .send({ email: 'test@example.com', password: 'testpassword' });
    token = loginRes.body.token;

    // Create a notification for the user
    await Notification.create({ user_id: userId, message: 'You have a new bid' });
  });

  it('should retrieve notifications for the logged-in user', async () => {
    const res = await request(app)
      .get('/notifications')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should mark a notification as read', async () => {
    const notifications = await request(app)
      .get('/notifications')
      .set('Authorization', `Bearer ${token}`);
    const notificationId = notifications.body[0].id;

    const res = await request(app)
      .post('/notifications/mark-read')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: notificationId });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Notification marked as read');
  });
});
