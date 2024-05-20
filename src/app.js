require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const userRoutes = require('./routes/user');
const errorController = require('./controllers/error');
const addUser = require('./middleware/addUser'); // Importando o middleware

const { Product, User, Cart, CartItem } = require('./models/associations');

const app = express();

app.use(bodyParser.json());

// Adicionando o middleware para garantir que o usuário esteja disponível
app.use(addUser);

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(userRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Admin', email: 'admin@example.com' });
    }
    return user;
  })
  .then(user => {
    return user.createCart();
  })
  .then(cart => {
    app.listen(process.env.PORT || 3003);
  })
  .catch(err => {
    console.log(err);
  });

module.exports = app;
