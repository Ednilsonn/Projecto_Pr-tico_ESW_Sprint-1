const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.status(200).json({ products });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: 'Internal Server Error' });
    });
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
      res.status(200).json({ product });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: 'Internal Server Error' });
    });
};

exports.createProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  req.user.createProduct({
    title,
    imageUrl,
    price,
    description
  })
    .then(result => {
      res.status(201).json({ product: result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: 'Internal Server Error' });
    });
};

exports.updateProduct = (req, res, next) => {
  const productId = req.params.productId;
  const { title, imageUrl, price, description } = req.body;
  Product.findByPk(productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then(result => {
      res.status(200).json({ product: result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: 'Internal Server Error' });
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
      return product.destroy();
    })
    .then(result => {
      res.status(200).json({ msg: 'Product deleted' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: 'Internal Server Error' });
    });
};
