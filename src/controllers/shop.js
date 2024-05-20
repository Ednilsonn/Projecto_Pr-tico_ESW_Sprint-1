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

