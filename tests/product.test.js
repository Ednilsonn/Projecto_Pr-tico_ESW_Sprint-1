const request = require('supertest');
const app = require('../src/app');
const { Product } = require('../src/models');

describe('Product Routes', () => {
  let productId;

  beforeAll(async () => {
    // Setup code if needed
  });

  it('should create a new product', async () => {
    const response = await request(app)
      .post('/products')
      .send({
        title: 'New Product',
        price: 100,
        description: 'Product description',
        imageUrl: 'http://example.com/product.png'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    productId = response.body.id;
  });

  it('should get all products', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get a product by ID', async () => {
    const response = await request(app).get(`/products/${productId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', productId);
  });
});
