const Product = require('./product');
const User = require('./user');
const Cart = require('./cart');
const CartItem = require('./cart-item');

User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

module.exports = {
  Product,
  User,
  Cart,
  CartItem
};
