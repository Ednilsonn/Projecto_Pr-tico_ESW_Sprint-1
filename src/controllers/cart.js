const Cart = require('../models/cart');
const Product = require('../models/product');
const CartItem = require('../models/cart-item');

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
        .then(products => {
          res.status(200).json({ products });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ msg: 'Internal Server Error' });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: 'Internal Server Error' });
    });
};

exports.addToCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;

  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.CartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.status(200).json({ msg: 'Product added to cart' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: 'Internal Server Error' });
    });
};

exports.removeFromCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.CartItem.destroy();
    })
    .then(result => {
      res.status(200).json({ msg: 'Product removed from cart' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: 'Internal Server Error' });
    });
};
