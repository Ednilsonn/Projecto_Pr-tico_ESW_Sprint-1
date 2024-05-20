const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.status(200).json({ editing: false });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  Product.create({
    title,
    imageUrl,
    price,
    description
  })
  .then(result => {
    console.log('Product Created');
    res.status(200).json({ product: result });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: 'Internal Server Error' });
  });
};


