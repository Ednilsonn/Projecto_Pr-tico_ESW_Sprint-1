const request = require('supertest');
const app = require('../src/app');

describe('Cart Routes', () => {
  let token;

  beforeAll(async () => {
    // Assume user login here and set token
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'john@example.com',
        password: 'password'
      });
    token = response.body.token;
  });

  it('should get the cart for a user', async () => {
    const response = await request(app)
      .get('/cart')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('cart');
  });

  it('should add a product to the cart', async () => {
    const response = await request(app)
      .post('/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: 1 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Product added to cart');
  });

  it('should delete a product from the cart', async () => {
    const response = await request(app)
      .post('/cart-delete-item')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: 1 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Product removed from cart');
  });
});
