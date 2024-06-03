// tests/admin.test.js
const request = require('supertest');
const app = require('../src/app'); // Ajuste o caminho conforme sua estrutura

describe('Admin Routes', () => {
  it('should add a new product', async () => {
    const response = await request(app)
      .post('/admin/add-product')
      .send({
        title: 'Test Product',
        imageUrl: 'http://example.com/image.png',
        price: 10.0,
        description: 'Test Description'
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.product).toHaveProperty('id');
    expect(response.body.product.title).toBe('Test Product');
  });
});
