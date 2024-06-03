const request = require('supertest');
const app = require('../src/app');

describe('Shop Routes', () => {
  it('should get the index page', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Shop');
  });

  it('should get the cart page', async () => {
    const response = await request(app).get('/cart');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('cart');
  });

  it('should get the orders page', async () => {
    const response = await request(app).get('/orders');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('orders');
  });
});
