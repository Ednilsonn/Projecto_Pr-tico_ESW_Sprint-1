const request = require('supertest');
const app = require('../src/app');

describe('User Routes', () => {
  let userId;
  let token;

  it('should sign up a new user', async () => {
    const response = await request(app)
      .post('/users/signup')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User created successfully');
    userId = response.body.user.id;
  });

  it('should login an existing user', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'john@example.com',
        password: 'password'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  it('should get the profile of an authenticated user', async () => {
    const response = await request(app)
      .get('/users/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
  });
});
