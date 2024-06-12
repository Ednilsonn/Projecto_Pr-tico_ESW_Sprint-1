const request = require('supertest');
const app = require('../src/app'); // ajuste conforme a estrutura do seu projeto

describe('Orders Routes', () => {
  it('should create an order', async () => {
    const newProduct = await request(app)
      .post('/admin/add-product')
      .send({
        title: 'Product for Order',
        imageUrl: 'http://example.com/order-image.png',
        price: 50.0,
        description: 'Order Description'
      });

    const cartItem = await request(app)
      .post('/cart')
      .send({
        productId: newProduct.body.product.id,
        quantity: 3
      });

    const response = await request(app).post('/orders');

    expect(response.statusCode).toBe(200);
    expect(response.body.order).toHaveProperty('id');
    expect(response.body.order.items[0].productId).toBe(newProduct.body.product.id);
  });
});
